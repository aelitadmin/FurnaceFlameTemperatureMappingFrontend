import { useMemo } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";

/** Superheater coils shown as brown serpentine pipes. */
export default function SuperheaterCoils({ dimensions, boilerParams }) {
  const { width, depth, height } = dimensions;
  const banks = useMemo(() => {
    const configs = [
      { id: "dpsh", x: width * 0.0, y: height * 0.89, h: height * 0.23 },
      { id: "psh", x: width * 0.30, y: height * 0.90, h: height * 0.20 },
      { id: "rh", x: width * 0.60, y: height * 0.90, h: height * 0.20 },
      { id: "hsh", x: width * 0.90, y: height * 0.89, h: height * 0.23 },
    ];
    const casingWidth = width * 0.15;
    const casingDepth = depth * 0.5;
    const pipeRadius = Math.max(0.025, width * 0.0028);
    const rowCount = 8;
    const passes = 6;

    return configs.map((config) => {
      const xLeft = -casingWidth * 0.39;
      const xRight = casingWidth * 0.39;
      const pitch = (xRight - xLeft) / (passes - 1);
      const bendRadius = pitch / 2;
      const yTop = config.h * 0.39;
      const yBottom = -config.h * 0.39;
      const rowCurves = [];

      for (let row = 0; row < rowCount; row += 1) {
        const z = THREE.MathUtils.lerp(-casingDepth * 0.38, casingDepth * 0.38, row / (rowCount - 1));
        const points = [new THREE.Vector3(xLeft, yTop, z)];
        for (let pass = 0; pass < passes; pass += 1) {
          const x = xLeft + pitch * pass;
          const endsAtBottom = pass % 2 === 0;
          const yEnd = endsAtBottom ? yBottom : yTop;
          points.push(new THREE.Vector3(x, yEnd, z));

          if (pass < passes - 1) {
            const nextX = xLeft + pitch * (pass + 1);
            const centerX = (x + nextX) / 2;
            for (let step = 1; step <= 10; step += 1) {
              const angle = Math.PI - (step / 10) * Math.PI;
              points.push(new THREE.Vector3(
                centerX + bendRadius * Math.cos(angle),
                yEnd + (endsAtBottom ? -1 : 1) * bendRadius * Math.sin(angle),
                z,
              ));
            }
          }
        }

        const curve = new THREE.CatmullRomCurve3(points, false, "centripetal", 0.25);
        const outline = new THREE.TubeGeometry(curve, 240, pipeRadius * 1.65, 8, false);
        const hotTube = new THREE.TubeGeometry(curve, 240, pipeRadius, 8, false);
        rowCurves.push({ outline, hotTube });
      }

      const casingGeometry = new THREE.BoxGeometry(casingWidth, config.h, casingDepth);
      return { ...config, rowCurves, casingGeometry, casingWidth, casingDepth };
    });
  }, [width, depth, height]);

  return (
    <group>
      {banks.map((bank) => (
        <group key={bank.id} position={[bank.x, bank.y, 0]}>
          <CoilRows bank={bank} />
          <Html position={[0, height * 1.025 - bank.y, bank.casingDepth / 2 + 0.06]} center style={{ pointerEvents: "none" }}>
            <div style={coilReadoutStyle}>
              <div style={coilHeadingStyle}>{bank.id.toUpperCase()}</div>
              <div style={coilValuesStyle}>
                <div style={coilSideStyle}>
                  <span style={coilSideLabelStyle}>L</span>
                  <span style={coilTempStyle}>{formatTemperature(boilerParams?.[`fg_temp_after_${bank.id}_l`])}</span>
                </div>
                <div style={coilSideStyle}>
                  <span style={coilSideLabelStyle}>R</span>
                  <span style={coilTempStyle}>{formatTemperature(boilerParams?.[`fg_temp_after_${bank.id}_r`])}</span>
                </div>
              </div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

function CoilRows({ bank }) {
  return (
    <group>
      {bank.rowCurves.map((row, index) => (
        <group key={index} renderOrder={520}>
          <mesh geometry={row.outline} renderOrder={520}>
            <meshBasicMaterial color="#40131b" depthTest={false} toneMapped={false} />
          </mesh>
          <mesh geometry={row.hotTube} renderOrder={521}>
            <meshStandardMaterial
              color="#40131b"
              emissive="#40131b"
              emissiveIntensity={0.3}
              metalness={0.38}
              roughness={0.32}
              depthTest={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}



function formatTemperature(value) {
  return value != null && value !== "" && Number.isFinite(Number(value))
    ? `${Number(value).toFixed(0)}°C`
    : "—";
}

const coilReadoutStyle = {
  display: "grid",
  gap: "4px",
  width: "44px",
  boxSizing: "border-box",
  padding: "5px 3px",
  borderRadius: "7px",
  background: "rgba(8, 16, 30, .94)",
  border: "1px solid rgba(125, 183, 255, .55)",
  boxShadow: "0 3px 9px rgba(0,0,0,.38)",
  whiteSpace: "nowrap",
};

const coilHeadingStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
  color: "#f4f8ff",
  fontFamily: "Arial, sans-serif",
  fontSize: "11px",
  fontWeight: 800,
  letterSpacing: ".09em",
  lineHeight: 1,
};

const coilValuesStyle = {
  display: "grid",
  gap: "3px",
  fontFamily: "Arial, sans-serif",
};

const coilSideStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "2px 3px",
  borderRadius: "4px",
  background: "rgba(255,255,255,.07)",
};

const coilSideLabelStyle = {
  color: "#9bb0ca",
  fontSize: "8px",
  fontWeight: 700,
  letterSpacing: ".08em",
};

const coilTempStyle = {
  color: "#ffffff",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: "8px",
  fontWeight: 750,
  lineHeight: 1,
};

