"use client";

import { GAUGE_TICKS, mbpsToGaugeProgress } from "@/lib/gauge-scale";

const CX = 120;
const CY = 118;
const R = 88;
const ARC_LEN = Math.PI * R;

type Phase = "idle" | "ping" | "download" | "upload" | "done";

type Props = {
  liveMbps: number;
  phase: Phase;
  accent: "cyan" | "purple";
};

function tickLabelAngle(index: number): number {
  const n = GAUGE_TICKS.length - 1;
  return Math.PI - (index / n) * Math.PI;
}

export function SpeedGauge({ liveMbps, phase, accent }: Props) {
  const progress = mbpsToGaugeProgress(liveMbps);
  const dashOffset = ARC_LEN * (1 - progress);
  const stroke = accent === "cyan" ? "#2dd4bf" : "#c084fc";
  const needleRot = 180 - 180 * progress;

  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <svg viewBox="0 0 240 150" className="h-auto w-full drop-shadow-lg" aria-hidden>
        <defs>
          <linearGradient id="needleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <path
          d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
          fill="none"
          stroke="#1e293b"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
          fill="none"
          stroke={stroke}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={ARC_LEN}
          strokeDashoffset={dashOffset}
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
        {GAUGE_TICKS.map((tick, i) => {
          const a = tickLabelAngle(i);
          const x = CX + Math.cos(a) * (R + 18);
          const y = CY - Math.sin(a) * (R + 18) + 4;
          return (
            <text
              key={tick}
              x={x}
              y={y}
              textAnchor="middle"
              className="fill-slate-500 text-[8px] font-medium"
              style={{ fontSize: 8 }}
            >
              {tick}
            </text>
          );
        })}
        <g transform={`rotate(${needleRot} ${CX} ${CY})`}>
          <line
            x1={CX}
            y1={CY}
            x2={CX + R - 6}
            y2={CY}
            stroke="url(#needleGrad)"
            strokeWidth={5}
            strokeLinecap="round"
            className="transition-transform duration-150 ease-out"
          />
        </g>
        <circle cx={CX} cy={CY} r={7} fill="#0f172a" stroke="#334155" strokeWidth={2} />
      </svg>
      <div className="absolute inset-x-0 bottom-2 flex flex-col items-center gap-0.5 text-center">
        <p className="text-3xl font-semibold tabular-nums tracking-tight text-white">
          {phase === "ping"
            ? "…"
            : liveMbps >= 100
              ? liveMbps.toFixed(0)
              : liveMbps.toFixed(2)}
          <span className="ml-1 text-lg font-medium text-slate-400">Mbps</span>
        </p>
        <p className="text-xs font-medium tracking-wide text-slate-500">
          {phase === "ping" && "Midiendo ping"}
          {phase === "download" && "Descarga"}
          {phase === "upload" && "Subida"}
          {phase === "idle" && "Listo"}
          {phase === "done" && "Completado"}
        </p>
      </div>
    </div>
  );
}
