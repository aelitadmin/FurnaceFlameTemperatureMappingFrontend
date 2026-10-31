import { Billboard, Text } from "@react-three/drei";

const LAYER_THICKNESS = 0.85;

/** Small corner windows and readouts, split between the two opposite faces. */
export default function CornerTemperatureField({ layer, dimensions, position, isTopLayer = false, isBottomLayer = false, opacity = 1 }) {
  const basePosition = [position?.x ?? 0, position?.y ?? layer.z, position?.z ?? 0];
  const corners = {
    c4: { id: "c4", x: -1, z: 1, temperature: layer.temperature?.c4, label: "C4" },
    c1: { id: "c1", x: -1, z: -1, temperature: layer.temperature?.c1, label: "C1" },
    c2: { id: "c2", x: 1, z: -1, temperature: layer.temperature?.c2, label: "C2" },
    c3: { id: "c3", x: 1, z: 1, temperature: layer.temperature?.c3, label: "C3" },
  };

  return (
    <group position={basePosition}>
      {Object.values(corners).map((corner) => (
        <CornerMarker key={corner.id} corner={corner} dimensions={dimensions} face={corner.z > 0 ? "front" : "back"} opacity={opacity} />
      ))}
      {(isTopLayer || isBottomLayer) && (
        <FrontEndSquares dimensions={dimensions} isTopLayer={isTopLayer} isBottomLayer={isBottomLayer} />
      )}
    </group>
  );
}

function CornerMarker({ corner, dimensions, face, opacity }) {
  const x = corner.x * (dimensions.width * 1.04 / 2 - 0.4);
  const z = corner.z * (dimensions.depth * 1.04 / 2 + 0.035);
  const temperatureColor = corner.temperature == null ? "#a8b2c1" : "#f5d66e";
  const isBackSide = face === "back";
  const stackOffset = isBackSide ? -0.28 : 0.28;

  return (
    <Billboard position={[x, stackOffset, z]} renderOrder={7}>
      <group>
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.45}
          color="#f5d66e"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.035}
          outlineColor="#050914"
          material-depthTest={false}
          material-depthWrite={false}
          opacity={opacity}
          fontWeight={700}
        >{corner.label}</Text>
        <Text
          position={[0, -0.08, 0]}
          fontSize={0.5}
          color={temperatureColor}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="#050914"
          material-depthTest={false}
          material-depthWrite={false}
          opacity={opacity}
          fontWeight={800}
        >{corner.temperature == null ? "N/A" : `${Math.round(corner.temperature)}°C`}</Text>
      </group>
    </Billboard>
  );
}

function FrontEndSquares({ dimensions, isTopLayer, isBottomLayer }) {
  const z = dimensions.depth * 1.04 / 2 + 0.04;
  const x = dimensions.width * 1.04 / 2 - 0.4;
  const shadowWidth = 0.02; // Thinner width of the shadow line (horizontal)
  const shadowHeight = 0.003; // Even thinner vertical height to look like a shadow line
  const numSquares = 80; // Much higher frequency to show air flow pattern

  const marks = [];
  // Generate squares distributed across the width
  for (let i = 0; i < numSquares; i++) {
    const xPos = -x + (i / (numSquares - 1)) * (2 * x);
    if (isTopLayer) marks.push([xPos, LAYER_THICKNESS / 2]);
    if (isBottomLayer) marks.push([xPos, -LAYER_THICKNESS / 2]);
  }

  return marks.map(([markX, y], index) => (
    <group key={`${markX}-${y}-${index}`} position={[markX, y, z]}>
      <mesh renderOrder={8}>
        <planeGeometry args={[shadowWidth, shadowHeight]} />
        <meshBasicMaterial color="#000000" toneMapped={false} depthTest={false} depthWrite={false} />
      </mesh>
    </group>
  ));
}
