"use client";

import Link from "next/link";
import { getApiBase } from "@/lib/speedtest-api";

export function TermsUsagePanel() {
  const base = getApiBase();

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-4 text-sm text-slate-400">
      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Términos y condiciones</h2>
        <p className="leading-relaxed">
          Al usar <strong className="text-slate-300">SpeedyFactosys</strong> aceptas los{" "}
          <Link href="/terminos" className="font-medium text-teal-400/90 underline-offset-2 hover:underline">
            Términos y condiciones de uso
          </Link>{" "}
          y la{" "}
          <Link href="/privacidad" className="font-medium text-teal-400/90 underline-offset-2 hover:underline">
            Política de privacidad
          </Link>
          . Factosys Peru SAC es la titular del Servicio.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Link
            href="/terminos"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-center text-xs font-semibold text-slate-200 transition-colors hover:border-teal-500/30 hover:bg-teal-500/10 hover:text-teal-200"
          >
            Ver términos completos
          </Link>
          <Link
            href="/privacidad"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-center text-xs font-semibold text-slate-200 transition-colors hover:border-teal-500/30 hover:bg-teal-500/10 hover:text-teal-200"
          >
            Ver privacidad
          </Link>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          <a
            href="https://www.factosysperu.com"
            className="text-slate-400 hover:text-teal-400/90"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.factosysperu.com
          </a>
          {" · "}
          <a href="mailto:sistemas@factosysperu.com" className="hover:text-slate-300">
            sistemas@factosysperu.com
          </a>
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Descripción de uso</h2>
        <p className="mb-4 text-xs leading-relaxed text-slate-500">
          Cómo funciona la herramienta, la medición y el almacenamiento local en tu navegador.
        </p>

        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-600">Cómo se realiza la medición</h3>
        <p className="leading-relaxed text-xs">
          El servidor <strong className="text-slate-300">no elige ni fuerza</strong> datos móviles ni Wi‑Fi: tu{" "}
          <strong className="text-slate-300">teléfono o navegador</strong> abre la conexión usando la red que tengas
          activa (4G/5G, Wi‑Fi, VPN, etc.). El backend solo responde a esas peticiones; el resultado refleja el camino
          entre tu dispositivo y el servidor según esa ruta.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          Misma herramienta para todas las conexiones: si pruebas con datos móviles, la medición suele corresponder a esa
          red; con Wi‑Fi, a esa.
        </p>

        <h3 className="mb-2 mt-5 text-[11px] font-semibold uppercase tracking-wider text-slate-600">API de medición</h3>
        <p className="leading-relaxed text-xs">
          El front usa <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] text-teal-300">NEXT_PUBLIC_API_BASE</code>{" "}
          si está definida; si no, <span className="font-mono text-slate-300">{getApiBase()}</span>.
        </p>
        <p className="mt-2 break-all font-mono text-[11px] text-slate-500">Actual: {base}</p>

        <h3 className="mb-2 mt-5 text-[11px] font-semibold uppercase tracking-wider text-slate-600">Historial</h3>
        <p className="leading-relaxed text-xs">
          Los resultados se guardan en <strong className="text-slate-300">sessionStorage</strong> y solo se conservan{" "}
          <strong className="text-slate-300">5 minutos</strong> desde cada medición. Cerrar la pestaña borra el historial de sesión.
        </p>
      </section>
    </div>
  );
}
