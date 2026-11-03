import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

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
          <CoilReadout
            position={[-bank.casingWidth * 0.48, bank.h * 0.08, 0]}
            bankId={bank.id}
            side="l"
            value={boilerParams?.[`fg_temp_after_${bank.id}_l`]}
          />
          <CoilReadout
            position={[bank.casingWidth * 0.48, bank.h * 0.08, 0]}
            bankId={bank.id}
            side="r"
            value={boilerParams?.[`fg_temp_after_${bank.id}_r`]}
          />
        </group>
      ))}
    </group>
  );
}

function CoilReadout({ position, bankId, side, value }) {
  const elementRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (!elementRef.current) return;
    const viewingRightFace = camera.position.x >= 0;
    const visible = side === "r" ? viewingRightFace : !viewingRightFace;
    elementRef.current.style.opacity = visible ? "1" : "0";
    elementRef.current.style.transform = visible
      ? "translateY(0px) scale(1)"
      : "translateY(6px) scale(0.94)";
    elementRef.current.style.filter = visible ? "none" : "blur(1px)";
  });

  const sideColor = side === "r" ? "#fb923c" : "#38bdf8";
  const sideLabel = side === "r" ? "RIGHT" : "LEFT";

  return (
    <Html
      ref={elementRef}
      position={position}
      center
      zIndexRange={[100, 0]}
      style={{
        pointerEvents: "none",
        transition: "opacity 0.22s ease, transform 0.22s ease, filter 0.22s ease",
      }}
    >
      <div style={coilReadoutStyle(sideColor)}>
        <div style={coilHeadingStyle(sideColor)}>
          <span style={coilSideDotStyle(sideColor)} />
          {bankId.toUpperCase()}
        </div>
        <div style={coilSideLabelStyle(sideColor)}>{sideLabel}</div>
        <div style={coilTempStyle}>{formatTemperature(value)}</div>
      </div>
    </Html>
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

const coilReadoutStyle = (sideColor) => ({
  display: "grid",
  gap: "3px",
  width: "66px",
  boxSizing: "border-box",
  padding: "7px 6px",
  borderRadius: "11px",
  background: "linear-gradient(160deg, rgba(8, 18, 36, 0.96) 0%, rgba(15, 30, 58, 0.94) 100%)",
  border: `1px solid ${sideColor}55`,
  boxShadow: `0 6px 18px rgba(0,0,0,0.42), 0 0 0 1px ${sideColor}22, inset 0 1px 0 rgba(255,255,255,0.08)`,
  whiteSpace: "nowrap",
  backdropFilter: "blur(6px)",
  transform: "translateZ(0)",
});

const coilHeadingStyle = (sideColor) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  color: "#f4f8ff",
  fontFamily: "Arial, sans-serif",
  fontSize: "9px",
  fontWeight: 800,
  letterSpacing: "0.12em",
  lineHeight: 1,
  textShadow: `0 0 8px ${sideColor}66`,
});

const coilSideLabelStyle = (sideColor) => ({
  color: sideColor,
  fontFamily: "Arial, sans-serif",
  fontSize: "8px",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textAlign: "center",
  lineHeight: 1,
  opacity: 0.95,
});

const coilSideDotStyle = (sideColor) => ({
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: sideColor,
  boxShadow: `0 0 8px ${sideColor}`,
  display: "inline-block",
});

const coilTempStyle = {
  color: "#ffffff",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: "13px",
  fontWeight: 800,
  lineHeight: 1,
  textAlign: "center",
  textShadow: "0 1px 2px rgba(0,0,0,0.45)",
  letterSpacing: "0.02em",
};

