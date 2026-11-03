// src/furnace3d/scene/AirflowParticles.jsx
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * AirflowParticles - Subtle white particles showing gas flow path
 * Path: Hopper → Lower Boiler → Middle Boiler → Top Boiler → DPSH → PSH → RH → HSH → disappear
 */
export default function AirflowParticles({ dimensions }) {
  const { width, depth, height } = dimensions;
  const particlesRef = useRef();
  const materialRef = useRef();
  const particleCount = 130;
  const pointSize = Math.max(0.22, height * 0.0046);

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      data.push({
        offset: Math.random(),
        speed: 0.045 + Math.random() * 0.02,
        xOffset: (Math.random() - 0.5) * width * 0.98,
        zOffset: (Math.random() - 0.5) * depth * 0.98,
        opacity: 0.55 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, [particleCount, width, depth]);

  const geometry = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      opacities[i] = particles[i].opacity;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("opacity", new THREE.BufferAttribute(opacities, 1));
    return geo;
  }, [particles, particleCount]);

  const spriteTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.18, "rgba(255, 255, 255, 0.95)");
    gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.55)");
    gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.18)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const uniforms = useMemo(() => ({
    uMap: { value: spriteTexture },
    uSize: { value: pointSize },
  }), [spriteTexture, pointSize]);

  useFrame(({ clock }) => {
    if (!particlesRef.current || !width || !depth || !height) return;

    const time = clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array;
    const opacities = particlesRef.current.geometry.attributes.opacity.array;
    if (materialRef.current) {
      materialRef.current.uniforms.uSize.value = pointSize;
    }

    const riseEnd = 0.58;
    const cornerEnd = 0.68;
    const startX = -width * 0.1;
    const endX = width * 1.05;
    const yRiseStart = height * 0.02;
    const yRiseEnd = height * 0.94;
    const coilTopY = height * 0.98;
    const coilBottomY = height * 0.89;

    particles.forEach((particle, i) => {
      const p = (time * particle.speed + particle.offset) % 1;
      const xSpread = particle.xOffset;
      const zSpread = particle.zOffset;
      const yCoil = THREE.MathUtils.lerp(coilBottomY, coilTopY, particle.phase / (Math.PI * 2));
      const zCoil = zSpread * 0.4;
      const verticalDispersion = Math.sin(time * 2.0 + particle.phase) * height * 0.012;

      let x;
      let y;
      let z;
      let alpha;

      if (p < riseEnd) {
        const rise = p / riseEnd;
        x = xSpread;
        y = THREE.MathUtils.lerp(yRiseStart, yRiseEnd, rise);
        z = zSpread;
        alpha = 0.45 + rise * 0.4;
      } else if (p < cornerEnd) {
        const turn = THREE.MathUtils.smoothstep((p - riseEnd) / (cornerEnd - riseEnd), 0, 1);
        x = THREE.MathUtils.lerp(xSpread, startX, turn);
        y = THREE.MathUtils.lerp(yRiseEnd, yCoil, turn);
        z = THREE.MathUtils.lerp(zSpread, zCoil, turn);
        alpha = 0.85;
      } else {
        const across = (p - cornerEnd) / (1 - cornerEnd);
        x = THREE.MathUtils.lerp(startX, endX, across);
        y = yCoil;
        z = zCoil;
        alpha = across > 0.92 ? 0.85 * (1 - (across - 0.92) / 0.08) : 0.85;
      }

      if (p < 0.03) alpha *= p / 0.03;

      const pulse = 0.88 + Math.sin(time * 1.5 + particle.phase) * 0.12;
      alpha *= pulse;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y + verticalDispersion;
      positions[i * 3 + 2] = z;
      opacities[i] = Math.max(0, alpha * particle.opacity);
    });

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.opacity.needsUpdate = true;
  });

  if (!width || !depth || !height) return null;

  return (
    <points ref={particlesRef} renderOrder={10} frustumCulled={false}>
      <primitive object={geometry} attach="geometry" />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        uniforms={uniforms}
        vertexShader={`
          attribute float opacity;
          uniform float uSize;
          varying float vOpacity;
          void main() {
            vOpacity = opacity;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = max(3.0, uSize * (380.0 / max(1.0, -mvPosition.z)));
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform sampler2D uMap;
          varying float vOpacity;
          void main() {
            vec4 tex = texture2D(uMap, gl_PointCoord);
            float alpha = tex.a * vOpacity;
            if (alpha < 0.02) discard;
            gl_FragColor = vec4(vec3(1.0), alpha);
          }
        `}
      />
    </points>
  );
}
