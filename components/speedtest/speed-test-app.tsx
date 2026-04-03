"use client";

import { useCallback, useRef, useState } from "react";
import {
  getApiBase,
  measureDownload,
  measurePing,
  measureUpload,
  // fetchActiveAds,
} from "@/lib/speedtest-api";
// import type { ActiveAdsResponse } from "@/lib/ads-types";
import { BottomNav, type SpeedTestTab } from "@/components/speedtest/bottom-nav";
import { AdBanner } from "@/components/speedtest/ad-banner";
import { ResultsPanel } from "@/components/speedtest/results-panel";
import { TermsUsagePanel } from "@/components/speedtest/terms-usage-panel";
import { SpeedGauge } from "@/components/speedtest/speed-gauge";
import { WaveDivider } from "@/components/speedtest/wave-divider";
import { useTestResults } from "@/context/test-results-context";

type Phase = "idle" | "ping" | "download" | "upload" | "done";

const DOWNLOAD_MB = 6;
const UPLOAD_BYTES = 2 * 1024 * 1024;

/** Reserva columnas laterales y monta AdBanner. Requiere ENABLE_ADS en lib/ads-config.ts para ver contenido. */
const SHOW_ADS = false; // Cambiar a true para activar

function formatMbps(v: number | null): string {
  if (v === null) return "—";
  if (v >= 100) return v.toFixed(0);
  return v.toFixed(1);
}

function formatMs(v: number | null): string {
  if (v === null) return "—";
  return `${Math.round(v)}`;
}

export function SpeedTestApp() {
  const { addResult } = useTestResults();
  // const [activeAds, setActiveAds] = useState<ActiveAdsResponse | null>(null);

  // TODO: Activar cuando el módulo de monetización esté listo.
  // useEffect(() => {
  //   void fetchActiveAds().then(setActiveAds).catch(() => {
  //     setActiveAds(null);
  //   });
  // }, []);

  const [activeTab, setActiveTab] = useState<SpeedTestTab>("speed");
  const [phase, setPhase] = useState<Phase>("idle");
  const [running, setRunning] = useState(false);
  const [liveMbps, setLiveMbps] = useState(0);
  const [downloadMbps, setDownloadMbps] = useState<number | null>(null);
  const [uploadMbps, setUploadMbps] = useState<number | null>(null);
  const [pingMs, setPingMs] = useState<number | null>(null);
  const [jitterMs, setJitterMs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const smoothRef = useRef(0);

  const resetSmooth = () => {
    smoothRef.current = 0;
    setLiveMbps(0);
  };

  const pushLive = useCallback((raw: number) => {
    smoothRef.current = smoothRef.current * 0.72 + raw * 0.28;
    setLiveMbps(smoothRef.current);
  }, []);

  const runTest = async () => {
    setError(null);
    setRunning(true);
    setDownloadMbps(null);
    setUploadMbps(null);
    setPingMs(null);
    setJitterMs(null);
    resetSmooth();

    try {
      setPhase("ping");
      const { pingMs: p, jitterMs: j } = await measurePing(6);
      setPingMs(p);
      setJitterMs(j);

      setPhase("download");
      resetSmooth();
      const down = await measureDownload(DOWNLOAD_MB, pushLive);
      setDownloadMbps(down);
      setLiveMbps(down);

      setPhase("upload");
      resetSmooth();
      const up = await measureUpload(UPLOAD_BYTES, pushLive);
      setUploadMbps(up);
      smoothRef.current = up;
      setLiveMbps(up);

      addResult({
        pingMs: p,
        jitterMs: j,
        downloadMbps: down,
        uploadMbps: up,
        serverUrl: getApiBase(),
      });

      setPhase("done");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      setError(msg);
      setPhase("idle");
    } finally {
      setRunning(false);
    }
  };

  const handleReset = () => {
    if (activeTab !== "speed") {
      setActiveTab("speed");
      return;
    }
    if (running) return;
    setPhase("idle");
    setDownloadMbps(null);
    setUploadMbps(null);
    setPingMs(null);
    setJitterMs(null);
    resetSmooth();
    setError(null);
  };

  const handleShare = async () => {
    const lines = [
      `Velocidad · Bajada ${formatMbps(downloadMbps)} Mbps · Subida ${formatMbps(uploadMbps)} Mbps`,
      `Ping ${formatMs(pingMs)} ms · Jitter ${formatMs(jitterMs)} ms`,
    ];
    const text = lines.join("\n");
    try {
      if (navigator.share) {
        await navigator.share({ title: "SpeedyFactosys", text });
      } else {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      /* ignore */
    }
  };

  const gaugeAccent = phase === "upload" ? "purple" : "cyan";
  const showGaugeActive = running || phase === "done";

  return (
    <div className="flex min-h-full flex-1 flex-col bg-gradient-to-b from-[#0c1222] via-[#0a0f1c] to-[#060912] text-slate-100">
      <header className="flex items-center justify-between px-4 pt-4">
        <button
          type="button"
          onClick={handleReset}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          aria-label={activeTab === "speed" ? "Reiniciar medición" : "Volver al test"}
        >
          ✕
        </button>
        <span className="max-w-[min(100%,11rem)] truncate text-center text-xs font-bold tracking-wide text-white sm:max-w-none sm:text-sm sm:tracking-[0.12em]">
          SpeedyFactosys
        </span>
        {activeTab === "speed" ? (
          <button
            type="button"
            onClick={handleShare}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Compartir resultado"
          >
            <ShareIcon />
          </button>
        ) : (
          <span className="h-10 w-10" aria-hidden />
        )}
      </header>

      {activeTab === "speed" && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-6 px-8">
            <div className="text-center">
              <p className="mb-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <span className="inline-block h-2 w-2 rounded-full bg-teal-400" />
                Bajada Mbps
              </p>
              <p className="text-4xl font-semibold tabular-nums text-white">{formatMbps(downloadMbps)}</p>
            </div>
            <div className="text-center">
              <p className="mb-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <span className="inline-block h-2 w-2 rounded-full bg-violet-400" />
                Subida Mbps
              </p>
              <p className="text-4xl font-semibold tabular-nums text-white">{formatMbps(uploadMbps)}</p>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-slate-400">
            Ping <span className="font-medium text-slate-200">{formatMs(pingMs)} ms</span>
            {" · "}
            Jitter <span className="font-medium text-slate-200">{formatMs(jitterMs)} ms</span>
            {" · "}
            Pérdida <span className="font-medium text-slate-200">0%</span>
          </p>

          <div className="mt-5 px-6">
            <WaveDivider />
          </div>

          <div
            className={`relative mt-2 flex flex-1 flex-col px-4 pb-6 ${SHOW_ADS ? "" : "items-center"}`}
          >
            <div
              className={
                SHOW_ADS
                  ? "mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 md:grid md:grid-cols-[minmax(72px,1fr)_minmax(0,320px)_minmax(72px,1fr)] md:items-start md:gap-3 lg:gap-4"
                  : "flex w-full flex-1 flex-col items-center"
              }
            >
              {SHOW_ADS && (
                <div className="hidden md:flex md:order-1 md:justify-end md:pt-2">
                  {/* Tras activar fetch: ad={activeAds?.lateral_izquierdo ?? undefined} */}
                  <AdBanner posicion="lateral-izquierdo" />
                </div>
              )}

              <div className="order-1 flex min-w-0 flex-col items-center md:order-2">
                {error && (
                  <p className="mb-3 max-w-sm rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-center text-sm text-amber-100">
                    {error}
                    <span className="mt-1 block text-xs text-amber-200/80">
                      ¿Está el backend en marcha? ({getApiBase()})
                    </span>
                  </p>
                )}

                {showGaugeActive ? (
                  <div className="mt-2 w-full">
                    <SpeedGauge liveMbps={liveMbps} phase={phase} accent={gaugeAccent} />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={runTest}
                    disabled={running}
                    className="mt-10 flex h-44 w-44 shrink-0 items-center justify-center rounded-full border-[3px] border-amber-400/90 bg-[#0d1528] text-5xl font-black tracking-tight text-amber-400 shadow-[0_0_40px_rgba(250,204,21,0.12)] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    GO
                  </button>
                )}

                {showGaugeActive && !running && phase === "done" && (
                  <button
                    type="button"
                    onClick={runTest}
                    className="mt-4 rounded-full border border-teal-500/40 bg-teal-500/10 px-6 py-2 text-sm font-semibold text-teal-300 transition-colors hover:bg-teal-500/20"
                  >
                    Probar de nuevo
                  </button>
                )}
              </div>

              {SHOW_ADS && (
                <div className="hidden md:flex md:order-3 md:justify-start md:pt-2">
                  {/* Tras activar fetch: ad={activeAds?.lateral_derecho ?? undefined} */}
                  <AdBanner posicion="lateral-derecho" />
                </div>
              )}

              {SHOW_ADS && (
                <div className="order-2 flex w-full max-w-md flex-col gap-3 self-center border-t border-white/5 pt-4 md:hidden">
                  <AdBanner posicion="lateral-izquierdo" />
                  <AdBanner posicion="lateral-derecho" />
                </div>
              )}
            </div>

            <div className="mt-auto w-full max-w-sm pt-8">
              <p className="text-center text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Valora tu operador
              </p>
              <div className="mt-2 flex justify-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-lg text-amber-400/90" aria-hidden>
                    ★
                  </span>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-slate-500">
                Servidor · <span className="text-slate-400">{getApiBase()}</span>
              </p>
              <p className="mt-1 text-center text-xs text-slate-600">Tu conexión (navegador)</p>
            
              <a
                href="https://factosysperu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-center text-xs font-medium text-teal-400/90 underline-offset-2 transition-colors hover:text-teal-300 hover:underline"
              >
                factosysperu.com
              </a>
            </div>
          </div>
        </>
      )}

      {activeTab === "results" && (
        <div className="flex min-h-0 flex-1 flex-col pt-4">
          <h2 className="px-4 text-center text-[11px] font-bold tracking-[0.25em] text-slate-500">RESULTADOS</h2>
          <ResultsPanel />
        </div>
      )}

      {activeTab === "terms" && (
        <div className="flex min-h-0 flex-1 flex-col pt-4">
          <h2 className="px-4 text-center text-[10px] font-bold leading-snug tracking-[0.2em] text-slate-500 sm:text-[11px] sm:tracking-[0.25em]">
            TÉRMINOS Y DESCRIPCIÓN DE USO
          </h2>
          <TermsUsagePanel />
        </div>
      )}

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" strokeLinecap="round" />
      <path d="M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
