"use client";

import type { ReactNode } from "react";

export type SpeedTestTab = "speed" | "results" | "terms";

type Props = {
  active: SpeedTestTab;
  onChange?: (t: SpeedTestTab) => void;
};

const iconClass = (active: boolean) =>
  active ? "text-teal-400" : "text-slate-500 hover:text-slate-400";

export function BottomNav({ active, onChange }: Props) {
  const Item = ({
    id,
    children,
  }: {
    id: SpeedTestTab;
    children: ReactNode;
  }) => (
    <button
      type="button"
      onClick={() => onChange?.(id)}
      className={`flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium transition-colors ${iconClass(active === id)}`}
      aria-current={active === id ? "page" : undefined}
    >
      {children}
    </button>
  );

  return (
    <nav className="flex border-t border-slate-800/80 bg-[#0a0f1c]/95 px-2 pb-safe pt-1 backdrop-blur-md">
      <Item id="speed">
        <GaugeIcon />
        Test
      </Item>
      <Item id="results">
        <ListIcon />
        Resultados
      </Item>
      <Item id="terms">
        <DocumentIcon />
        <span className="flex flex-col items-center leading-[1.15] text-center">
          <span>Términos</span>
          <span className="max-w-[5.5rem] text-[8px] font-normal text-current opacity-90">y descripción de uso</span>
        </span>
      </Item>
    </nav>
  );
}

function GaugeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" strokeLinejoin="round" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
