"use client";

import { ENABLE_ADS } from "@/lib/ads-config";
import type { ActiveAd, AdPosition } from "@/lib/ads-types";

type Props = {
  posicion: AdPosition;
  /** Rellenar cuando se active la carga desde GET /ads/active */
  ad?: ActiveAd | null;
};

/**
 * Hueco lateral para monetización. Respeta ENABLE_ADS en lib/ads-config.ts.
 */
export function AdBanner({ posicion, ad }: Props) {
  if (!ENABLE_ADS) {
    return null;
  }

  const label = posicion === "lateral-izquierdo" ? "Espacio publicitario" : "Espacio publicitario";

  const inner = (() => {
    if (!ad) {
      return (
        <div
          className="flex min-h-[120px] w-full max-w-[160px] flex-col items-center justify-center rounded-lg border border-red-500/35 bg-red-950/25 px-2 py-3 text-center"
          aria-hidden
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider text-red-300/70">{label}</span>
          <span className="mt-1 text-[9px] text-red-200/40">160×600</span>
        </div>
      );
    }

    if (ad.tipo === "imagen" && ad.content_url) {
      const img = (
        <img
          src={ad.content_url}
          alt=""
          className="h-auto max-h-[280px] w-full max-w-[160px] rounded-lg object-contain"
        />
      );
      if (ad.link_destino) {
        return (
          <a
            href={ad.link_destino}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block rounded-lg ring-1 ring-white/10 transition-opacity hover:opacity-90"
          >
            {img}
          </a>
        );
      }
      return img;
    }

    if (ad.tipo === "google-ads") {
      return (
        <div
          className="flex min-h-[120px] w-full max-w-[160px] items-center justify-center rounded-lg border border-white/10 bg-[#0d1528]/90 text-[10px] text-slate-500"
          data-ad-slot={ad.content_url ?? undefined}
        >
          Google Ads
        </div>
      );
    }

    return (
      <div className="flex min-h-[120px] w-full max-w-[160px] flex-col items-center justify-center rounded-lg border border-red-500/35 bg-red-950/25 px-2 py-3 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-red-300/70">{label}</span>
      </div>
    );
  })();

  return (
    <aside
      className="w-full max-w-[160px] rounded-xl border border-white/[0.06] bg-[#0a1020]/80 p-2 shadow-inner shadow-black/20 backdrop-blur-sm md:max-w-[180px]"
      aria-label={label}
      data-posicion={posicion}
    >
      {inner}
    </aside>
  );
}
