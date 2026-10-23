import{a as e,n as t,t as n}from"./jsx-runtime-BHRyFc-h.js";import{t as r}from"./index-DlB6icrk.js";import{t as i}from"./abhitech-logo-DszTi9Uw.js";var a=e(t(),1),o=n(),s=`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    /* Enhanced Slate Color Palette */
    --slate-900: #0f172a;
    --slate-800: #1e293b;
    --slate-700: #334155;
    --slate-600: #475569;
    --slate-500: #64748b;
    --slate-400: #94a3b8;
    --slate-300: #cbd5e1;
    --slate-200: #e2e8f0;
    --slate-100: #f1f5f9;
    --slate-50: #f8fafc;

    /* Enhanced Indigo Color Palette */
    --indigo-900: #312e81;
    --indigo-800: #3730a3;
    --indigo-700: #4338ca;
    --indigo-600: #4f46e5;
    --indigo-500: #6366f1;
    --indigo-400: #818cf8;
    --indigo-300: #a5b4fc;
    --indigo-200: #c7d2fe;
    --indigo-100: #e0e7ff;
    --indigo-50: #eef2ff;

    --white: #ffffff;
    --glass-bg: rgba(15, 23, 42, 0.6);
    --glass-border: rgba(99, 102, 241, 0.3);
    --selected-bg: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%);
    --selected-border: rgba(129, 140, 248, 0.9);
    --glow: 0 0 20px rgba(99, 102, 241, 0.4);
    --glow-strong: 0 0 40px rgba(99, 102, 241, 0.6), 0 0 80px rgba(79, 70, 229, 0.3);
  }

  /* ── Enhanced Animated background ── */
  .ss-bg {
    position: fixed; inset: 0; z-index: 0;
    background: radial-gradient(ellipse at 20% 50%, #1e293b 0%, var(--slate-900) 60%),
                radial-gradient(ellipse at 80% 20%, #1e3a8a 0%, transparent 50%);
    overflow: hidden;
  }

  .ss-bg-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridPulse 8s ease-in-out infinite;
  }
  @keyframes gridPulse {
    0%,100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }

  /* Enhanced Orb blobs */
  .ss-orb {
    position: absolute; border-radius: 50%;
    filter: blur(80px); animation: orbFloat linear infinite;
    pointer-events: none;
  }
  .ss-orb-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(79, 70, 229, 0.25) 0%, transparent 70%);
    top: -100px; left: -100px; animation-duration: 25s;
  }
  .ss-orb-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
    bottom: -80px; right: -80px; animation-duration: 30s; animation-delay: -10s;
  }
  .ss-orb-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(129, 140, 248, 0.12) 0%, transparent 70%);
    top: 40%; left: 60%; animation-duration: 20s; animation-delay: -5s;
  }
  @keyframes orbFloat {
    0%   { transform: translate(0,0) scale(1); }
    33%  { transform: translate(30px,-40px) scale(1.05); }
    66%  { transform: translate(-20px,30px) scale(0.95); }
    100% { transform: translate(0,0) scale(1); }
  }

  /* Particles canvas */
  .ss-particles { position: absolute; inset: 0; pointer-events: none; }

  /* Wave SVG lines */
  .ss-waves {
    position: absolute; bottom: 0; left: 0; right: 0; height: 200px;
    opacity: 0.18; pointer-events: none;
  }
  .wave-path-1 { animation: waveDrift 12s ease-in-out infinite; }
  .wave-path-2 { animation: waveDrift 15s ease-in-out infinite reverse; }
  @keyframes waveDrift {
    0%,100% { d: path("M0,100 C200,60 400,140 600,100 C800,60 1000,140 1200,100 C1400,60 1600,140 1920,100 L1920,200 L0,200 Z"); }
    50% { d: path("M0,120 C200,80 400,160 600,120 C800,80 1000,160 1200,120 C1400,80 1600,160 1920,120 L1920,200 L0,200 Z"); }
  }

  /* ── Enhanced Header ── */
  .ss-header {
    position: sticky; top: 0; z-index: 200;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(99, 102, 241, 0.2);
    box-shadow: 0 1px 0 rgba(99, 102, 241, 0.15), 0 4px 30px rgba(0,0,0,0.4);
  }
  .ss-header::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.7), rgba(129, 140, 248, 0.5), transparent);
    animation: scanLine 4s linear infinite;
  }
  @keyframes scanLine {
    0% { opacity: 0.3; } 50% { opacity: 1; } 100% { opacity: 0.3; }
  }

  .ss-header-inner {
    display: flex; align-items: center; padding: 12px 24px; gap: 12px; flex-wrap: wrap;
  }

  .ss-logo-block { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }

  .ss-logo-ring {
    width: 44px; height: 44px; flex-shrink: 0;
    border-radius: 50%; position: relative;
    background: linear-gradient(135deg, rgba(37,99,198,0.3), rgba(6,182,212,0.2));
    border: 1px solid rgba(77,141,232,0.4);
    display: flex; align-items: center; justify-content: center;
    animation: logoGlow 3s ease-in-out infinite;
  }
  .ss-logo-ring::before {
    content: ''; position: absolute; inset: -2px; border-radius: 50%;
    border: 1px solid transparent;
    background: linear-gradient(135deg, rgba(77,141,232,0.6), transparent) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out; mask-composite: exclude;
    animation: ringRotate 6s linear infinite;
  }
  @keyframes logoGlow { 0%,100% { box-shadow: 0 0 10px rgba(37,99,198,0.3); } 50% { box-shadow: 0 0 25px rgba(37,99,198,0.6), 0 0 50px rgba(6,182,212,0.2); } }
  @keyframes ringRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  .ss-logo-img { width: 28px; height: 28px; object-fit: contain; position: relative; z-index: 1; }

  .ss-brand-name {
    font-family: 'Inter', sans-serif; font-size: clamp(10px, 1.5vw, 16px); font-weight: 800;
    color: var(--white); letter-spacing: 0.04em; white-space: nowrap;
    text-overflow: ellipsis; overflow: hidden;
    text-shadow: 0 0 20px rgba(77,141,232,0.4);
  }
  .ss-brand-tagline {
    font-family: 'Inter', sans-serif; font-size: clamp(9px, 1vw, 11px);
    color: rgba(180,210,255,0.5); letter-spacing: 0.1em; margin-top: 2px; font-weight: 400;
  }

  .ss-header-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

  .ss-role-badge {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 12px; border-radius: 20px;
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; color: var(--blue-100);
    background: rgba(37,99,198,0.2); border: 1px solid rgba(77,141,232,0.35);
    transition: all 0.3s; cursor: default;
  }
  .ss-role-badge:hover { background: rgba(37,99,198,0.35); border-color: rgba(77,141,232,0.6); }
  .ss-role-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--cyan-400); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }

  .ss-username-badge {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 12px; border-radius: 20px;
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 500;
    color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
  }

  .ss-logout-btn {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 14px; border-radius: 8px; cursor: pointer;
    font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.06em;
    color: var(--white); background: rgba(220,38,38,0.15);
    border: 1px solid rgba(248,113,113,0.35); transition: all 0.25s;
    position: relative; overflow: hidden;
  }
  .ss-logout-btn::before {
    content: ''; position: absolute; inset: 0; opacity: 0;
    background: linear-gradient(135deg, rgba(220,38,38,0.3), rgba(239,68,68,0.2));
    transition: opacity 0.25s;
  }
  .ss-logout-btn:hover::before { opacity: 1; }
  .ss-logout-btn:hover { border-color: rgba(248,113,113,0.7); transform: translateY(-1px); box-shadow: 0 4px 15px rgba(220,38,38,0.3); }

  /* Logo image with flame glow */
  .ss-logo-img {
    width: 32px; height: 32px; object-fit: contain; position: relative; z-index: 1;
    animation: logoFlame 4s ease-in-out infinite;
    filter: drop-shadow(0 0 6px rgba(77,141,232,0.7));
  }
  @keyframes logoFlame {
    0%,100% { filter: drop-shadow(0 0 6px rgba(77,141,232,0.7)) drop-shadow(0 0 12px rgba(37,99,198,0.4)); transform: scale(1); }
    33%  { filter: drop-shadow(0 0 10px rgba(99,179,255,0.9)) drop-shadow(0 0 20px rgba(34,211,238,0.5)); transform: scale(1.05); }
    66%  { filter: drop-shadow(0 0 8px rgba(77,141,232,0.8)) drop-shadow(0 0 16px rgba(37,99,198,0.3)); transform: scale(0.98); }
  }

  /* ── Main layout ── */
  .ss-main {
    position: relative; z-index: 10;
    min-height: calc(100vh - 68px);
    display: flex; align-items: center; justify-content: center;
    padding: clamp(16px,4vw,48px) clamp(12px,3vw,24px);
  }

  /* ── Card ── */
  .ss-card {
    width: 100%; max-width: 680px;
    background: linear-gradient(160deg, rgba(22,45,85,0.7) 0%, rgba(13,32,64,0.8) 100%);
    border: 1px solid rgba(77,141,232,0.22);
    backdrop-filter: blur(24px) saturate(150%);
    border-radius: 24px; padding: clamp(24px,5vw,44px);
    box-shadow: 0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(77,141,232,0.08) inset, var(--glow);
    position: relative; overflow: hidden;
    animation: cardEntrance 0.7s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes cardEntrance {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .ss-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(77,141,232,0.8), rgba(34,211,238,0.6), rgba(77,141,232,0.8), transparent);
    animation: topBorder 5s ease-in-out infinite;
  }
  @keyframes topBorder { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
  .ss-card::after {
    content: ''; position: absolute; inset: 0; border-radius: 24px; pointer-events: none;
    background: radial-gradient(ellipse at 50% 0%, rgba(77,141,232,0.06) 0%, transparent 60%);
  }

  /* ── Title ── */
  .ss-title {
    font-family: 'Inter', sans-serif;
    font-size: clamp(20px,4vw,30px); font-weight: 900; letter-spacing: 0.04em;
    text-align: center; color: var(--white); margin-bottom: 6px;
    text-shadow: 0 0 40px rgba(77,141,232,0.5), 0 2px 4px rgba(0,0,0,0.4);
    position: relative;
    animation: titleEntrance 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both;
  }
  @keyframes titleEntrance {
    from { opacity:0; transform: translateY(-10px); letter-spacing: 0.15em; }
    to   { opacity:1; transform: translateY(0); letter-spacing: 0.04em; }
  }
  .ss-title-underline {
    width: 60px; height: 2px; margin: 10px auto 28px;
    background: linear-gradient(90deg, transparent, var(--cyan-400), transparent);
    border-radius: 1px; animation: underlinePulse 3s ease-in-out infinite;
  }
  @keyframes underlinePulse { 0%,100% { width:40px; opacity:0.6; } 50% { width:80px; opacity:1; } }

  /* ── Section ── */
  .ss-section { margin-bottom: 28px; }

  .ss-section-label {
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.14em; color: rgba(180,210,255,0.6);
    text-align: center; margin-bottom: 14px; text-transform: uppercase;
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .ss-section-label::before, .ss-section-label::after {
    content: ''; flex: 1; max-width: 60px; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(77,141,232,0.4));
  }
  .ss-section-label::after { background: linear-gradient(270deg, transparent, rgba(77,141,232,0.4)); }

  /* ── Station info banner ── */
  .ss-station-info {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(200,225,255,0.8);
    padding: 8px 16px; border-radius: 8px; margin-bottom: 12px;
    background: rgba(37,99,198,0.1); border: 1px solid rgba(77,141,232,0.2);
  }

  /* ── Button grid ── */
  .ss-btn-grid {
    display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;
  }

  /* ── Station/Unit button ── */
  .ss-btn {
    position: relative; display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 18px; border-radius: 10px; cursor: pointer;
    font-family: 'Inter', sans-serif; font-size: clamp(11px,1.5vw,13px); font-weight: 600;
    letter-spacing: 0.04em; color: rgba(180,210,255,0.75);
    background: rgba(255,255,255,0.04); border: 1px solid rgba(77,141,232,0.2);
    transition: all 0.25s cubic-bezier(0.4,0,0.2,1); overflow: hidden;
    white-space: nowrap;
  }
  .ss-btn::before {
    content: ''; position: absolute; inset: 0; opacity: 0;
    background: radial-gradient(circle at 50% 50%, rgba(77,141,232,0.2), transparent 70%);
    transition: opacity 0.25s;
  }
  .ss-btn:hover:not(.ss-btn--disabled)::before { opacity: 1; }
  .ss-btn:hover:not(.ss-btn--disabled) {
    border-color: rgba(77,141,232,0.5); color: var(--white);
    transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,99,198,0.25);
  }

  .ss-btn--selected {
    background: linear-gradient(135deg, rgba(26,79,156,0.9) 0%, rgba(37,99,198,0.95) 50%, rgba(29,78,216,0.9) 100%);
    border-color: rgba(99,179,255,0.7) !important;
    color: var(--white) !important;
    box-shadow: 0 0 20px rgba(37,99,198,0.5), 0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1) !important;
    transform: scale(1.04) !important;
    animation: selectedGlow 2.5s ease-in-out infinite;
  }
  @keyframes selectedGlow {
    0%,100% { box-shadow: 0 0 20px rgba(37,99,198,0.5), 0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1); }
    50% { box-shadow: 0 0 35px rgba(37,99,198,0.75), 0 4px 25px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15); }
  }

  .ss-btn--disabled {
    cursor: not-allowed; opacity: 0.3; filter: blur(1.5px);
    pointer-events: none;
  }

  .ss-btn-check {
    position: absolute; top: -2px; right: -2px;
    width: 18px; height: 18px; border-radius: 50%;
    background: linear-gradient(135deg, var(--cyan-400), #3b82f6);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 8px rgba(34,211,238,0.6);
    animation: checkPop 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes checkPop { from { transform: scale(0); } to { transform: scale(1); } }

  /* Icon SVG inside buttons */
  .ss-btn-icon { opacity: 0.7; flex-shrink: 0; }
  .ss-btn--selected .ss-btn-icon { opacity: 1; }

  /* Unit section entrance */
  .ss-unit-section {
    animation: sectionSlide 0.45s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes sectionSlide {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Divider */
  .ss-divider {
    height: 1px; margin: 4px 0 28px;
    background: linear-gradient(90deg, transparent, rgba(77,141,232,0.25), transparent);
  }

  /* ── Proceed button ── */
  .ss-proceed-btn {
    width: 100%; padding: 16px 24px; border-radius: 12px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 12px;
    font-family: 'Inter', sans-serif; font-size: clamp(13px,2vw,16px); font-weight: 800; letter-spacing: 0.08em;
    color: rgba(180,210,255,0.5); background: rgba(255,255,255,0.04);
    border: 1px solid rgba(77,141,232,0.15); transition: all 0.3s;
    margin-top: 8px; position: relative; overflow: hidden;
  }
  .ss-proceed-btn--active {
    color: var(--white) !important;
    background: linear-gradient(135deg, #0f3460 0%, #1a4f9c 40%, #2563c6 70%, #1d4ed8 100%) !important;
    border-color: rgba(99,179,255,0.6) !important;
    cursor: pointer !important;
    box-shadow: 0 8px 30px rgba(37,99,198,0.4), 0 0 0 1px rgba(77,141,232,0.2) inset !important;
  }
  .ss-proceed-btn--active::before {
    content: ''; position: absolute; inset: 0; opacity: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%);
    transform: translateX(-100%); transition: none;
    animation: shimmer 3s ease-in-out infinite;
  }
  @keyframes shimmer { 0%,100% { opacity:0; transform:translateX(-100%); } 50% { opacity:1; transform:translateX(100%); } }
  .ss-proceed-btn--active:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(37,99,198,0.55), 0 0 0 1px rgba(77,141,232,0.3) inset !important;
  }
  .ss-proceed-btn--active:active { transform: translateY(0); }

  .ss-proceed-arrow {
    transition: transform 0.3s;
  }
  .ss-proceed-btn--active:hover .ss-proceed-arrow { transform: translateX(4px); }

  /* ── Aurora behind card ── */
  .ss-aurora {
    position: fixed; z-index: 1; pointer-events: none;
    width: 700px; height: 500px;
    top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: radial-gradient(ellipse at 50% 50%,
      rgba(37,99,198,0.12) 0%,
      rgba(6,182,212,0.06) 40%,
      transparent 70%);
    border-radius: 50%; filter: blur(40px);
    animation: auroraPulse 6s ease-in-out infinite;
  }
  @keyframes auroraPulse {
    0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.7; }
    50% { transform: translate(-50%,-50%) scale(1.15); opacity: 1; }
  }

  /* Staggered button entrance */
  .ss-btn { animation: btnEntrance 0.4s cubic-bezier(0.16,1,0.3,1) both; }
  @keyframes btnEntrance {
    from { opacity: 0; transform: scale(0.85) translateY(8px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @media (max-width: 480px) {
    .ss-header-inner { padding: 10px 14px; }
    .ss-brand-name { font-size: 9px; letter-spacing: 0.02em; }
    .ss-card { padding: 20px 16px; border-radius: 16px; }
    .ss-btn { padding: 9px 13px; font-size: 11px; }
    .ss-role-badge, .ss-username-badge { font-size: 10px; padding: 5px 8px; }
    .ss-logout-btn { padding: 7px 10px; font-size: 10px; }
  }
`,c=()=>(0,o.jsxs)(`svg`,{className:`ss-btn-icon`,width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,o.jsx)(`path`,{d:`M2 20v-8l6-4v4l6-4v4l6-4v12H2z`}),(0,o.jsx)(`line`,{x1:`12`,y1:`20`,x2:`12`,y2:`15`}),(0,o.jsx)(`line`,{x1:`8`,y1:`20`,x2:`8`,y2:`15`})]}),l=()=>(0,o.jsxs)(`svg`,{className:`ss-btn-icon`,width:`15`,height:`15`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,o.jsx)(`rect`,{x:`3`,y:`3`,width:`8`,height:`8`,rx:`1`}),(0,o.jsx)(`rect`,{x:`13`,y:`3`,width:`8`,height:`8`,rx:`1`}),(0,o.jsx)(`rect`,{x:`3`,y:`13`,width:`8`,height:`8`,rx:`1`}),(0,o.jsx)(`rect`,{x:`13`,y:`13`,width:`8`,height:`8`,rx:`1`})]}),u=()=>(0,o.jsx)(`svg`,{width:`10`,height:`10`,viewBox:`0 0 10 10`,fill:`none`,stroke:`white`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,o.jsx)(`polyline`,{points:`1.5,5 4,7.5 8.5,2.5`})});function d(){let e=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=e.current;if(!t)return;let n=t.getContext(`2d`),r=t.width=window.innerWidth,i=t.height=window.innerHeight,a=()=>{r=t.width=window.innerWidth,i=t.height=window.innerHeight};window.addEventListener(`resize`,a);let o=Array.from({length:70},()=>({x:Math.random()*r,y:Math.random()*i,vx:(Math.random()-.5)*.3,vy:-Math.random()*.4-.1,r:Math.random()*2+.5,alpha:Math.random()*.6+.1,pulse:Math.random()*Math.PI*2})),s,c=()=>{n.clearRect(0,0,r,i),o.forEach(e=>{e.pulse+=.015;let t=e.alpha*(.6+.4*Math.sin(e.pulse));n.beginPath(),n.arc(e.x,e.y,e.r,0,Math.PI*2),n.fillStyle=`rgba(77,141,232,${t})`,n.fill(),e.x+=e.vx,e.y+=e.vy,e.y<-5&&(e.y=i+5,e.x=Math.random()*r),(e.x<0||e.x>r)&&(e.vx*=-1)});for(let e=0;e<o.length;e++)for(let t=e+1;t<o.length;t++){let r=o[e].x-o[t].x,i=o[e].y-o[t].y,a=Math.sqrt(r*r+i*i);a<100&&(n.beginPath(),n.moveTo(o[e].x,o[e].y),n.lineTo(o[t].x,o[t].y),n.strokeStyle=`rgba(77,141,232,${.12*(1-a/100)})`,n.lineWidth=.5,n.stroke())}s=requestAnimationFrame(c)};return c(),()=>{cancelAnimationFrame(s),window.removeEventListener(`resize`,a)}},[]),(0,o.jsx)(`canvas`,{ref:e,className:`ss-particles`})}var f=[{id:1,name:`BTPS`},{id:2,name:`CSTPS`},{id:3,name:`KPKD`},{id:4,name:`KTPS`},{id:5,name:`NTPS`},{id:6,name:`PARAS TPS`},{id:7,name:`PARALI TPS`}],p={1:[{id:3,name:`Unit 3`},{id:4,name:`Unit 4`},{id:5,name:`Unit 5`},{id:6,name:`Unit 6`}],2:[{id:3,name:`Unit 3`},{id:4,name:`Unit 4`},{id:5,name:`Unit 5`},{id:6,name:`Unit 6`},{id:7,name:`Unit 7`},{id:8,name:`Unit 8`},{id:9,name:`Unit 9`}],3:[{id:1,name:`Unit 1`},{id:2,name:`Unit 2`},{id:3,name:`Unit 3`},{id:4,name:`Unit 4`},{id:5,name:`Unit 5`}],4:[{id:6,name:`Unit 6`},{id:8,name:`Unit 8`},{id:9,name:`Unit 9`},{id:10,name:`Unit 10`}],5:[{id:3,name:`Unit 3`},{id:4,name:`Unit 4`},{id:5,name:`Unit 5`}],6:[{id:3,name:`Unit 3`},{id:4,name:`Unit 4`}],7:[{id:6,name:`Unit 6`},{id:7,name:`Unit 7`},{id:8,name:`Unit 8`}]},m=e=>p[e]||[];function h(){let[e]=(0,a.useState)(f),[t]=(0,a.useState)(()=>localStorage.getItem(`username`)),[n]=(0,a.useState)(()=>localStorage.getItem(`location`)),[p,h]=(0,a.useState)(()=>{let e=localStorage.getItem(`location`);return!e||e===`all`?null:f.find(t=>t.name===e)||null}),[g,_]=(0,a.useState)(()=>{let e=localStorage.getItem(`location`);if(!e||e===`all`)return[];let t=f.find(t=>t.name===e);return t?m(t.id):[]}),[v,y]=(0,a.useState)(null),b=r();(0,a.useEffect)(()=>{let e=`ss-premium-styles`;if(!document.getElementById(e)){let t=document.createElement(`style`);t.id=e,t.textContent=s,document.head.appendChild(t)}return()=>{}},[]);let x=e=>_(m(e));(0,a.useEffect)(()=>{localStorage.setItem(`selectedStation`,JSON.stringify(p)),localStorage.setItem(`selectedUnit`,JSON.stringify(v))},[p,v]);let S=e=>{n===`all`&&(h(e),y(null),x(e.id))},C=e=>y(e),w=()=>{p&&v&&(localStorage.setItem(`selectedStation`,JSON.stringify(p)),localStorage.setItem(`selectedUnit`,JSON.stringify(v)),b(`/dashboard`))},T=()=>{localStorage.clear(),b(`/`)},E=n===`all`,D=!!(p&&v);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(`div`,{className:`ss-bg`,children:[(0,o.jsx)(`div`,{className:`ss-bg-grid`}),(0,o.jsx)(`div`,{className:`ss-orb ss-orb-1`}),(0,o.jsx)(`div`,{className:`ss-orb ss-orb-2`}),(0,o.jsx)(`div`,{className:`ss-orb ss-orb-3`}),(0,o.jsx)(d,{}),(0,o.jsx)(`div`,{className:`ss-aurora`}),(0,o.jsxs)(`svg`,{className:`ss-waves`,viewBox:`0 0 1920 200`,preserveAspectRatio:`none`,children:[(0,o.jsx)(`path`,{className:`wave-path-1`,fill:`rgba(37,99,198,0.4)`,d:`M0,100 C200,60 400,140 600,100 C800,60 1000,140 1200,100 C1400,60 1600,140 1920,100 L1920,200 L0,200 Z`}),(0,o.jsx)(`path`,{className:`wave-path-2`,fill:`rgba(6,182,212,0.25)`,d:`M0,120 C300,80 500,160 800,120 C1100,80 1300,160 1920,120 L1920,200 L0,200 Z`})]})]}),(0,o.jsx)(`header`,{className:`ss-header`,children:(0,o.jsxs)(`div`,{className:`ss-header-inner`,children:[(0,o.jsxs)(`div`,{className:`ss-logo-block`,children:[(0,o.jsx)(`div`,{className:`ss-logo-ring`,children:(0,o.jsx)(`img`,{src:i,alt:`Abhitech Logo`,className:`ss-logo-img`})}),(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`div`,{className:`ss-brand-name`,children:`ABHITECH FURNACE FLAME TEMPERATURE MAPPING`}),(0,o.jsx)(`div`,{className:`ss-brand-tagline`,children:`FURNACE FLAME TEMPERATURE MAPPING SYSTEM`})]})]}),(0,o.jsxs)(`div`,{className:`ss-header-right`,children:[(0,o.jsxs)(`div`,{className:`ss-role-badge`,children:[(0,o.jsx)(`span`,{className:`ss-role-dot`}),E?`ADMIN`:`USER`]}),t&&(0,o.jsxs)(`div`,{className:`ss-username-badge`,children:[(0,o.jsxs)(`svg`,{width:`12`,height:`12`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,children:[(0,o.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,o.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),t]}),(0,o.jsxs)(`button`,{className:`ss-logout-btn`,onClick:T,children:[(0,o.jsxs)(`svg`,{width:`13`,height:`13`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,o.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,o.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,o.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`LOGOUT`]})]})]})}),(0,o.jsx)(`main`,{className:`ss-main`,children:(0,o.jsxs)(`div`,{className:`ss-card`,children:[(0,o.jsx)(`div`,{className:`ss-title`,children:`SELECT STATION & UNIT`}),(0,o.jsx)(`div`,{className:`ss-title-underline`}),(0,o.jsxs)(`div`,{className:`ss-section`,children:[(0,o.jsx)(`div`,{className:`ss-section-label`,children:`STATION`}),!E&&p&&(0,o.jsxs)(`div`,{className:`ss-station-info`,children:[(0,o.jsxs)(`svg`,{width:`13`,height:`13`,viewBox:`0 0 24 24`,fill:`none`,stroke:`rgba(34,211,238,0.8)`,strokeWidth:`2`,children:[(0,o.jsx)(`path`,{d:`M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z`}),(0,o.jsx)(`circle`,{cx:`12`,cy:`10`,r:`3`})]}),`Assigned station: `,(0,o.jsx)(`strong`,{style:{color:`rgba(180,210,255,0.95)`,marginLeft:4},children:p.name})]}),(0,o.jsx)(`div`,{className:`ss-btn-grid`,children:e.map(e=>{let t=p?.id===e.id,n=!E&&!t,r=!E&&p&&!t;return(0,o.jsxs)(`button`,{className:[`ss-btn`,t?`ss-btn--selected`:``,n?`ss-btn--disabled`:``].join(` `),style:{...r?{opacity:.25,filter:`blur(2px)`}:{},animationDelay:`${e.id*.06}s`},onClick:()=>S(e),disabled:n,children:[(0,o.jsx)(c,{}),e.name,t&&(0,o.jsx)(`span`,{className:`ss-btn-check`,children:(0,o.jsx)(u,{})})]},e.id)})})]}),p&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`div`,{className:`ss-divider`}),(0,o.jsxs)(`div`,{className:`ss-section ss-unit-section`,children:[(0,o.jsxs)(`div`,{className:`ss-section-label`,children:[`UNIT — `,p.name]}),(0,o.jsx)(`div`,{className:`ss-btn-grid`,children:g.map(e=>{let t=v?.id===e.id,n=v&&!t;return(0,o.jsxs)(`button`,{className:[`ss-btn`,t?`ss-btn--selected`:``].join(` `),style:{...n?{opacity:.3,filter:`blur(1.5px)`}:{},animationDelay:`${g.indexOf(e)*.07}s`},onClick:()=>C(e),children:[(0,o.jsx)(l,{}),e.name,t&&(0,o.jsx)(`span`,{className:`ss-btn-check`,children:(0,o.jsx)(u,{})})]},e.id)})})]})]}),(0,o.jsxs)(`button`,{className:[`ss-proceed-btn`,D?`ss-proceed-btn--active`:``].join(` `),onClick:w,disabled:!D,children:[`PROCEED TO DASHBOARD`,(0,o.jsxs)(`svg`,{className:`ss-proceed-arrow`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,o.jsx)(`line`,{x1:`5`,y1:`12`,x2:`19`,y2:`12`}),(0,o.jsx)(`polyline`,{points:`12 5 19 12 12 19`})]})]})]})})]})}export{h as default};