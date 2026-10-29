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
  const particleCount = 100;

  console.log('AirflowParticles rendering with dimensions:', dimensions);

  if (!width || !depth || !height) {
    console.log('AirflowParticles: dimensions not available', dimensions);
    return null;
  }

  // Initialize particle data - spread across entire furnace
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      data.push({
        progress: Math.random(), // 0 to 1 along the path
        speed: 0.03 + Math.random() * 0.02, // varied speed
        xOffset: (Math.random() - 0.5) * width * 0.98, // full width spread
        zOffset: (Math.random() - 0.5) * depth * 0.98, // full depth spread
        size: 0.04 + Math.random() * 0.03, // particle size
        opacity: 0.18 + Math.random() * 0.1, // opacity
        phase: Math.random() * Math.PI * 2 // for pulsing
      });
    }
    return data;
  }, [particleCount, width, depth]);

  // Create geometry
  const geometry = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const opacities = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      sizes[i] = particles[i].size;
      opacities[i] = particles[i].opacity;
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
    return geo;
  }, [particles, particleCount]);

  // Animate particles along the path
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;

    const time = clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array;
    const opacities = particlesRef.current.geometry.attributes.opacity.array;
    
    particles.forEach((particle, i) => {
      // Update progress
      particle.progress += particle.speed * 0.016; // normalize to ~60fps
      if (particle.progress > 1) {
        particle.progress = 0;
      }

      const p = particle.progress;
      const xSpread = particle.xOffset;
      const zSpread = particle.zOffset;

      // Flue gas path: rise vertically, then flow left to right through coils
      const riseEnd = 0.68;
      const turnEnd = 0.77;
      const rising = p < riseEnd;
      const turning = p >= riseEnd && p < turnEnd;
      const across = p < turnEnd ? 0 : (p - turnEnd) / (1 - turnEnd);
      const rise = THREE.MathUtils.clamp(p / riseEnd, 0, 1);
      const turn = turning ? (p - riseEnd) / (turnEnd - riseEnd) : p >= turnEnd ? 1 : 0;

      // Vertical dispersion for gas-like effect
      const verticalDispersion = Math.sin(time * 2.0 + particle.phase) * height * 0.02;

      // Coil positions (DPSH, PSH, RH, HSH) - left to right order
      const dpshX = width * 0.0;
      const pshX = width * 0.30;
      const rhX = width * 0.60;
      const hshX = width * 0.90;

      let x, y, z, alpha;

      if (rising) {
        // Rising vertically through entire furnace volume - from bottom to very top
        y = THREE.MathUtils.lerp(height * 0.02, height * 0.95, rise) + verticalDispersion;
        x = xSpread; // maintain full width spread
        z = zSpread; // maintain full depth spread
        alpha = 0.3 + rise * 0.4;
      } else if (turning) {
        // Turning at gooseneck - start converging for left-to-right flow
        y = THREE.MathUtils.lerp(height * 0.95, height * 0.98, turn) + verticalDispersion;
        x = xSpread * (1 - turn * 0.5); // converge toward center
        z = zSpread * 0.5; // move toward front
        alpha = 0.7;
      } else {
        // Flowing LEFT TO RIGHT through superheater coils (DPSH → PSH → RH → HSH)
        // Cover full vertical extent of coils including lower parts
        const coilTopY = height * 0.98;
        const coilBottomY = height * 0.89;
        // Fixed Y position based on particle's random phase (no animation)
        const yOffset = (particle.phase / (Math.PI * 2)) * (coilTopY - coilBottomY);
        y = coilBottomY + yOffset + verticalDispersion;
        z = zSpread * 0.4; // wider depth spread to cover lower parts

        // Clear left-to-right flow from DPSH to HSH - extend further right to cover RH and HSH
        const startX = dpshX - width * 0.1;
        const endX = hshX + width * 0.15; // extend further right to fully cover HSH
        x = THREE.MathUtils.lerp(startX, endX, across);

        // Fade out only at the very end after HSH
        if (across > 0.95) {
          alpha = 0.7 * (1 - (across - 0.95) * 20);
        } else {
          alpha = 0.7;
        }
      }

      // Add subtle pulsing
      const pulse = 0.85 + Math.sin(time * 1.5 + particle.phase) * 0.15;
      alpha *= pulse;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      opacities[i] = alpha * particle.opacity;
    });
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.opacity.needsUpdate = true;
  });

  // Create sprite texture for soft particles
  const spriteTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // Create brighter white radial gradient
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.95)');
    gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.6)');
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.25)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <points ref={particlesRef} renderOrder={10}>
      <primitive object={geometry} attach="geometry" />
      <pointsMaterial
        size={0.4}
        map={spriteTexture}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
        vertexColors={false}
        color="#ffffff"
        sizeAttenuation
      />
    </points>
  );
}
