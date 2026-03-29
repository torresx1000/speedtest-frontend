"use client";

import { useTestResults } from "@/context/test-results-context";

function formatMbps(v: number): string {
  if (v >= 100) return v.toFixed(0);
  return v.toFixed(1);
}

function formatClock(at: number): string {
  return new Intl.DateTimeFormat("es", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(at));
}

export function ResultsPanel() {
  const { records, windowMs } = useTestResults();
  const minutes = windowMs / 60_000;

  if (records.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-sm text-slate-400">
          No hay mediciones en los últimos <strong className="text-slate-300">{minutes} minutos</strong>.
        </p>
        <p className="mt-2 max-w-xs text-xs text-slate-500">
          Los resultados se guardan solo en esta pestaña del navegador (sessionStorage) y caducan pasado ese tiempo.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <p className="shrink-0 px-4 pb-2 text-center text-[11px] text-slate-500">
        Ventana: últimos {minutes} min · {records.length} medición(es)
      </p>
      <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-4">
        {records.map((r) => (
          <li
            key={r.id}
            className="rounded-xl border border-slate-700/60 bg-slate-900/45 px-4 py-3 text-sm shadow-sm"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-700/50 pb-2 text-xs text-slate-500">
              <span className="tabular-nums">{formatClock(r.at)}</span>
              <span className="max-w-[55%] truncate font-mono text-[10px] text-slate-600" title={r.serverUrl}>
                {r.serverUrl}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-teal-500/90">Bajada</p>
                <p className="text-lg font-semibold tabular-nums text-white">{formatMbps(r.downloadMbps)}</p>
                <p className="text-[10px] text-slate-500">Mbps</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-400/90">Subida</p>
                <p className="text-lg font-semibold tabular-nums text-white">{formatMbps(r.uploadMbps)}</p>
                <p className="text-[10px] text-slate-500">Mbps</p>
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">
              Ping <span className="font-medium text-slate-200">{Math.round(r.pingMs)} ms</span>
              {" · "}
              Jitter <span className="font-medium text-slate-200">{Math.round(r.jitterMs)} ms</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
