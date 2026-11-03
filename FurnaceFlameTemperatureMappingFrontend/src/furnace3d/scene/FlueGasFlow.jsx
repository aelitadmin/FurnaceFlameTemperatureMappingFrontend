import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Same path waypoints as AirflowParticles: rise, turn at the gooseneck, then DPSH → HSH. */
const RISE_END = 0.68;
const TURN_END = 0.77;
const FLOW_SPEED = 0.04;

/** Soft wall shadows that travel the same flue-gas path as the particles. */
export default function FlueGasFlow({ dimensions }) {
  const { width, depth, height } = dimensions;
  const faceRefs = useRef([]);
  const numFlows = 8;
  const numSegments = 6;
  const patchHeight = height * 0.048;

  const faces = useMemo(() => {
    const list = [];
    for (let i = 0; i < numFlows; i++) {
      for (let j = 0; j < numSegments; j++) {
        const lateral = (i + 0.37) / numFlows - 0.5;
        list.push(
          { wall: "front", position: [0, 0, depth / 2 - 0.025], rotation: [0, 0, 0], span: width, lateral, flowIndex: i, segmentIndex: j },
          { wall: "back", position: [0, 0, -depth / 2 + 0.025], rotation: [0, Math.PI, 0], span: width, lateral, flowIndex: i, segmentIndex: j },
          { wall: "right", position: [width / 2 - 0.025, 0, 0], rotation: [0, Math.PI / 2, 0], span: depth, lateral, flowIndex: i, segmentIndex: j },
          { wall: "left", position: [-width / 2 + 0.025, 0, 0], rotation: [0, -Math.PI / 2, 0], span: depth, lateral, flowIndex: i, segmentIndex: j },
        );
      }
    }
    return list;
  }, [width, depth, numFlows, numSegments]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const startX = -width * 0.1;
    const endX = width * 1.05;
    const coilTopY = height * 0.98;
    const coilBottomY = height * 0.89;

    faceRefs.current.forEach((plane, index) => {
      if (!plane) return;
      const face = faces[index];
      const offset = face.flowIndex / numFlows + face.segmentIndex / (numFlows * numSegments) * 0.16;
      const progress = (t * FLOW_SPEED + offset) % 1;
      const rising = progress < RISE_END;
      const turning = progress >= RISE_END && progress < TURN_END;
      const across = progress < TURN_END ? 0 : (progress - TURN_END) / (1 - TURN_END);
      const rise = THREE.MathUtils.clamp(progress / RISE_END, 0, 1);
      const turn = turning ? (progress - RISE_END) / (TURN_END - RISE_END) : progress >= TURN_END ? 1 : 0;
      const verticalDispersion = Math.sin(t * 2.0 + face.segmentIndex + face.flowIndex) * height * 0.02;
      const coilYOffset = ((face.flowIndex * 0.37 + face.segmentIndex * 0.19) % 1) * (coilTopY - coilBottomY);
      const acrossPass = progress >= TURN_END;
      const compactScaleX = Math.min(1, (Math.min(width, depth) * 0.22) / face.span);

      plane.visible = true;
      plane.position.y = rising
        ? THREE.MathUtils.lerp(height * 0.02, height * 0.95, rise) + verticalDispersion
        : turning
          ? THREE.MathUtils.lerp(height * 0.95, height * 0.98, turn) + verticalDispersion
          : coilBottomY + coilYOffset + verticalDispersion;

      const riseLateral = face.lateral * 0.85;
      if (face.wall === "front" || face.wall === "back") {
        const xRise = riseLateral * width;
        if (acrossPass) {
          plane.position.x = THREE.MathUtils.lerp(startX, endX, across);
          plane.scale.x = compactScaleX;
        } else if (turning) {
          plane.position.x = THREE.MathUtils.lerp(xRise, startX, turn);
          plane.scale.x = THREE.MathUtils.lerp(1, compactScaleX, turn);
        } else {
          plane.position.x = xRise;
          plane.scale.x = 1;
        }
        plane.position.z = face.position[2];
      } else {
        plane.position.x = face.position[0];
        if (acrossPass) {
          plane.position.z = THREE.MathUtils.lerp(-depth * 0.42, depth * 0.42, (across + face.lateral + 0.5) % 1);
          plane.scale.x = compactScaleX;
        } else if (turning) {
          plane.position.z = THREE.MathUtils.lerp(riseLateral * depth, -depth * 0.42, turn);
          plane.scale.x = THREE.MathUtils.lerp(1, compactScaleX, turn);
        } else {
          plane.position.z = riseLateral * depth;
          plane.scale.x = 1;
        }
      }

      plane.scale.y = 1;
      plane.rotation.z = 0;

      const alpha = rising
        ? 0.22 + rise * 0.12
        : turning
          ? 0.34
          : across > 0.95
            ? 0.34 * (1 - (across - 0.95) * 20)
            : 0.34;
      const pulse = 0.85 + Math.sin(t * 1.5 + face.flowIndex + face.segmentIndex) * 0.15;

      plane.material.uniforms.opacity.value = Math.max(0, alpha * pulse);
      plane.material.uniforms.time.value = t;
      plane.material.uniforms.flowIndex.value = face.flowIndex;
      plane.material.uniforms.segmentIndex.value = face.segmentIndex;
      plane.material.uniforms.stage.value = rising ? 0 : turning ? 0.5 : 1;
    });
  });

  return (
    <group renderOrder={2}>
      {faces.map((face, index) => (
        <mesh
          key={index}
          ref={(node) => { faceRefs.current[index] = node; }}
          position={face.position}
          rotation={face.rotation}
          renderOrder={2}
        >
          <planeGeometry args={[face.span, patchHeight]} />
          <shaderMaterial
            transparent
            depthTest
            depthWrite={false}
            side={THREE.DoubleSide}
            toneMapped={false}
            uniforms={{
              opacity: { value: 0.28 },
              time: { value: 0 },
              flowIndex: { value: 0 },
              segmentIndex: { value: 0 },
              stage: { value: 0 },
            }}
            vertexShader={`
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform float opacity;
              uniform float time;
              uniform float flowIndex;
              uniform float segmentIndex;
              uniform float stage;
              varying vec2 vUv;

              float noise(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
              }

              void main() {
                float edgeFade = smoothstep(0.0, 0.22, vUv.x) * (1.0 - smoothstep(0.78, 1.0, vUv.x));
                edgeFade *= smoothstep(0.0, 0.22, vUv.y) * (1.0 - smoothstep(0.78, 1.0, vUv.y));

                vec2 flowUv = vUv + vec2(stage * time * 0.35, (1.0 - stage) * time * 0.45);
                float gasNoise = noise(flowUv * 20.0 + time * 1.2 + flowIndex + segmentIndex * 0.5) * 0.5;
                gasNoise += noise(flowUv * 40.0 - time * 0.8) * 0.35;
                gasNoise += noise(flowUv * 60.0 + time * 1.5 + segmentIndex) * 0.2;
                gasNoise += noise(flowUv * 80.0 - time * 0.6) * 0.1;

                float fragmentation = smoothstep(0.3, 0.7, noise(flowUv * 30.0 + time * 0.9 + segmentIndex * 2.0));
                fragmentation *= 0.6 + noise(flowUv * 50.0 - time * 0.7) * 0.4;

                float wispy = smoothstep(0.2, 0.8, noise(flowUv * 25.0 + time * 1.1 + flowIndex * 2.0));
                wispy *= 0.5 + noise(flowUv * 45.0 + time * 0.5) * 0.5;

                float finalAlpha = opacity * edgeFade * (0.4 + gasNoise * 0.6) * fragmentation * wispy;
                gl_FragColor = vec4(vec3(0.0, 0.0, 0.0), finalAlpha);
              }
            `}
          />
        </mesh>
      ))}
    </group>
  );
}
