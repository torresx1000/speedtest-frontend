"use client";

import type { ReactNode } from "react";

export type SpeedTestTab = "speed" | "results" | "map" | "settings";

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
      <Item id="map">
        <PinIcon />
        Mapa
      </Item>
      <Item id="settings">
        <GearIcon />
        Ajustes
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

function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .66.39 1.26 1 1.51H21a2 2 0 1 1 0 4h-.09c-.66 0-1.26.39-1.51 1Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
