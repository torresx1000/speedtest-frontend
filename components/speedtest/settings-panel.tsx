"use client";

import { getApiBase } from "@/lib/speedtest-api";
import { getServerLocation } from "@/lib/server-location";

export function SettingsPanel() {
  const base = getApiBase();
  const loc = getServerLocation();

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-4 text-sm text-slate-400">
      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">API de medición</h2>
        <p className="leading-relaxed">
          El front usa <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-teal-300">NEXT_PUBLIC_API_BASE</code>{" "}
          si está definida; si no, <span className="font-mono text-slate-300">{getApiBase()}</span>.
        </p>
        <p className="mt-2 break-all font-mono text-xs text-slate-500">Actual: {base}</p>
      </section>
      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Mapa del servidor</h2>
        <p className="leading-relaxed">
          Coordenadas y nombre para el pin en la pestaña Mapa:
        </p>
        <ul className="mt-2 space-y-1 font-mono text-[11px] text-slate-500">
          <li>NEXT_PUBLIC_SERVER_LAT</li>
          <li>NEXT_PUBLIC_SERVER_LNG</li>
          <li>NEXT_PUBLIC_SERVER_LABEL (opcional)</li>
        </ul>
        <p className="mt-3 text-xs">
          Estado:{" "}
          {loc.configured ? (
            <span className="text-teal-400">ubicación configurada</span>
          ) : (
            <span className="text-amber-400/90">sin coordenadas</span>
          )}
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Historial</h2>
        <p className="leading-relaxed text-xs">
          Los resultados se guardan en <strong className="text-slate-300">sessionStorage</strong> y solo se conservan{" "}
          <strong className="text-slate-300">5 minutos</strong> desde cada medición. Cerrar la pestaña borra el historial de sesión.
        </p>
      </section>
    </div>
  );
}
