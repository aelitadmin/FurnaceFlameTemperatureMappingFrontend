import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** A soft, inset shadow that rises through the boiler and turns across the upper banks. */
export default function FlueGasFlow({ dimensions }) {
  const { width, depth, height } = dimensions;
  const faceRefs = useRef([]);
  const bandThickness = height * 0.085;
  const faces = [
    { position: [0, 0, depth / 2 - 0.025], rotation: [0, 0, 0], span: width },
    { position: [0, 0, -depth / 2 + 0.025], rotation: [0, Math.PI, 0], span: width },
    { position: [width / 2 - 0.025, 0, 0], rotation: [0, Math.PI / 2, 0], span: depth },
    { position: [-width / 2 + 0.025, 0, 0], rotation: [0, -Math.PI / 2, 0], span: depth },
  ];

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const progress = (t * 0.075) % 1;
    const riseEnd = 0.68;
    const turnEnd = 0.77;
    const rising = progress < riseEnd;
    const turning = progress >= riseEnd && progress < turnEnd;
    const across = progress < turnEnd ? 0 : (progress - turnEnd) / (1 - turnEnd);
    const rise = THREE.MathUtils.clamp(progress / riseEnd, 0, 1);
    const turn = turning ? (progress - riseEnd) / (turnEnd - riseEnd) : progress >= turnEnd ? 1 : 0;
    const upperFaceHeight = height * 0.28;
    const y = rising
      ? THREE.MathUtils.lerp(height * 0.08, height * 0.79, rise)
      : turning
        ? THREE.MathUtils.lerp(height * 0.79, height * 0.86, turn)
        : height * 0.86;
    const alpha = 0.14 + Math.sin(t * 2.2) * 0.012;

    faceRefs.current.forEach((plane, index) => {
      if (!plane) return;
      const face = faces[index];
      // Once upright, the shadow belongs only on the upper front panel.
      plane.visible = progress < turnEnd || index === 0;
      const horizontal = rising
        ? Math.sin(rise * Math.PI * 2) * face.span * 0.02
        : 0;

      plane.position.y = y;
      if (progress >= turnEnd && index === 0) {
        plane.position.x = THREE.MathUtils.lerp(0, width * 0.9, across);
      } else if (index < 2) plane.position.x = horizontal;
      else plane.position.z = horizontal;

      // The horizontal pass spans the face. Once upright, its long dimension
      // matches the upper bank height while its thickness stays unchanged.
      const uprightScaleX = upperFaceHeight / face.span;
      // After turning, keep the across-flow thickness equal to the horizontal
      // band thickness instead of stretching it to fill the whole face.
      const uprightScaleY = 1;
      plane.scale.x = turning
        ? THREE.MathUtils.lerp(1, uprightScaleX, turn)
        : progress < riseEnd ? 1 : uprightScaleX;
      plane.scale.y = turning
        ? THREE.MathUtils.lerp(1, uprightScaleY, turn)
        : progress < riseEnd ? 1 : uprightScaleY;
      // Begin as a horizontal shadow while rising, then turn vertical above
      // the gooseneck and keep that orientation as it crosses the banks.
      plane.rotation.z = progress < riseEnd
        ? 0
        : turning
          ? THREE.MathUtils.lerp(0, -Math.PI / 2, turn)
          : -Math.PI / 2;
      plane.material.uniforms.opacity.value = alpha;
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
          <planeGeometry args={[face.span, bandThickness]} />
          <shaderMaterial
            transparent
            depthTest
            depthWrite={false}
            side={THREE.DoubleSide}
            toneMapped={false}
            uniforms={{ opacity: { value: 0.14 } }}
            vertexShader={`
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform float opacity;
              varying vec2 vUv;
              void main() {
                float edgeFade = smoothstep(0.0, 0.22, vUv.y) * (1.0 - smoothstep(0.78, 1.0, vUv.y));
                gl_FragColor = vec4(vec3(0.025, 0.03, 0.045), opacity * edgeFade);
              }
            `}
          />
        </mesh>
      ))}
    </group>
  );
}
