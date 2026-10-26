import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** A soft, inset shadow that rises through the boiler and turns across the upper banks. */
export default function FlueGasFlow({ dimensions }) {
  const { width, depth, height } = dimensions;
  const faceRefs = useRef([]);
  const bandThickness = height * 0.02;
  const numFlows = 3;
  const numSegments = 5;
  const faces = [];

  for (let i = 0; i < numFlows; i++) {
    for (let j = 0; j < numSegments; j++) {
      faces.push(
        { position: [0, 0, depth / 2 - 0.025], rotation: [0, 0, 0], span: width, flowIndex: i, segmentIndex: j },
        { position: [0, 0, -depth / 2 + 0.025], rotation: [0, Math.PI, 0], span: width, flowIndex: i, segmentIndex: j },
        { position: [width / 2 - 0.025, 0, 0], rotation: [0, Math.PI / 2, 0], span: depth, flowIndex: i, segmentIndex: j },
        { position: [-width / 2 + 0.025, 0, 0], rotation: [0, -Math.PI / 2, 0], span: depth, flowIndex: i, segmentIndex: j }
      );
    }
  }

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    
    faceRefs.current.forEach((plane, index) => {
      if (!plane) return;
      const face = faces[index];
      const flowIndex = face.flowIndex;
      const segmentIndex = face.segmentIndex;
      const offset = flowIndex / numFlows + segmentIndex / (numFlows * numSegments) * 0.1;
      const progress = ((t * 0.12 + offset) % 1);
      const riseEnd = 0.68;
      const turnEnd = 0.77;
      const rising = progress < riseEnd;
      const turning = progress >= riseEnd && progress < turnEnd;
      const across = progress < turnEnd ? 0 : (progress - turnEnd) / (1 - turnEnd);
      const rise = THREE.MathUtils.clamp(progress / riseEnd, 0, 1);
      const turn = turning ? (progress - riseEnd) / (turnEnd - riseEnd) : progress >= turnEnd ? 1 : 0;
      const upperFaceHeight = height * 0.28;
      
      // Add vertical offset variation for gas-like dispersion
      const verticalDispersion = Math.sin(t * 2.0 + segmentIndex) * height * 0.02;
      const y = rising
        ? THREE.MathUtils.lerp(height * 0.08, height * 0.79, rise) + verticalDispersion
        : turning
          ? THREE.MathUtils.lerp(height * 0.79, height * 0.86, turn) + verticalDispersion
          : height * 0.86 + verticalDispersion;
      
      const alpha = 0.15 + Math.sin(t * 1.5 + flowIndex + segmentIndex * 0.5) * 0.03 + Math.sin(t * 3.0 + flowIndex) * 0.02;

      // Once upright, the shadow belongs only on the upper front panel.
      plane.visible = progress < turnEnd || (index % 4 === 0);
      const horizontal = rising
        ? Math.sin(rise * Math.PI * 2) * face.span * 0.02
        : 0;

      plane.position.y = y;
      if (progress >= turnEnd && index % 4 === 0) {
        plane.position.x = THREE.MathUtils.lerp(0, width * 0.9, across);
      } else if (index % 4 < 2) plane.position.x = horizontal;
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
      plane.material.uniforms.time.value = t;
      plane.material.uniforms.flowIndex.value = flowIndex;
      plane.material.uniforms.segmentIndex.value = segmentIndex;
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
            uniforms={{ 
              opacity: { value: 0.14 },
              time: { value: 0 },
              flowIndex: { value: 0 },
              segmentIndex: { value: 0 }
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
              varying vec2 vUv;
              
              // Simple noise function
              float noise(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
              }
              
              void main() {
                float edgeFade = smoothstep(0.0, 0.22, vUv.y) * (1.0 - smoothstep(0.78, 1.0, vUv.y));
                
                // Create fragmented, gas-like appearance with multiple noise layers
                float gasNoise = noise(vUv * 20.0 + time * 1.2 + flowIndex + segmentIndex * 0.5) * 0.5;
                gasNoise += noise(vUv * 40.0 - time * 0.8) * 0.35;
                gasNoise += noise(vUv * 60.0 + time * 1.5 + segmentIndex) * 0.2;
                gasNoise += noise(vUv * 80.0 - time * 0.6) * 0.1;
                
                // Create broken, fragmented pattern like gas
                float fragmentation = smoothstep(0.3, 0.7, noise(vUv * 30.0 + time * 0.9 + segmentIndex * 2.0));
                fragmentation *= 0.6 + noise(vUv * 50.0 - time * 0.7) * 0.4;
                
                // Additional wispy layers
                float wispy = smoothstep(0.2, 0.8, noise(vUv * 25.0 + time * 1.1 + flowIndex * 2.0));
                wispy *= 0.5 + noise(vUv * 45.0 + time * 0.5) * 0.5;
                
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
