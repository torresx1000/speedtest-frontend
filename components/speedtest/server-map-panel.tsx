"use client";

import dynamic from "next/dynamic";
import { getApiBase } from "@/lib/speedtest-api";
import { getServerLocation } from "@/lib/server-location";

const LeafletMap = dynamic(() => import("@/components/speedtest/server-map-leaflet"), {
  ssr: false,
  loading: () => (
    <div className="h-[min(42vh,340px)] w-full max-w-lg animate-pulse rounded-xl border border-slate-700/60 bg-slate-800/60" />
  ),
});

export function ServerMapPanel() {
  const loc = getServerLocation();
  const base = getApiBase();

  if (!loc.configured) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="max-w-sm text-sm leading-relaxed text-slate-400">
          Para fijar la ubicación del <strong className="text-slate-300">servidor de medición</strong> en el mapa,
          añade coordenadas en{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 text-teal-300">.env.local</code>:
        </p>
        <ul className="mt-4 max-w-sm space-y-1 text-left font-mono text-[11px] text-slate-500">
          <li>NEXT_PUBLIC_SERVER_LAT=-5.1945</li>
          <li>NEXT_PUBLIC_SERVER_LNG=-80.6328</li>
          <li>NEXT_PUBLIC_SERVER_LABEL=Piura, PE</li>
        </ul>
        <p className="mt-6 text-xs text-slate-600">
          API en uso: <span className="text-slate-500">{base}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center px-4 pb-4">
      <p className="mb-2 max-w-lg text-center text-sm text-slate-300">{loc.label}</p>
      <p className="mb-3 text-center text-xs text-slate-500">
        {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
      </p>
      <LeafletMap lat={loc.lat} lng={loc.lng} label={loc.label} />
    </div>
  );
}
