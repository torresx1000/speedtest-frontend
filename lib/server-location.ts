import { getApiBase } from "@/lib/speedtest-api";

function parseEnvNumber(v: string | undefined): number | null {
  if (v === undefined || v.trim() === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

/** Ubicación del servidor API (solo lectura en cliente; define en .env). */
export function getServerLocation():
  | { configured: true; lat: number; lng: number; label: string }
  | { configured: false } {
  const lat = parseEnvNumber(process.env.NEXT_PUBLIC_SERVER_LAT);
  const lng = parseEnvNumber(process.env.NEXT_PUBLIC_SERVER_LNG);
  if (lat === null || lng === null) return { configured: false };
  const label =
    process.env.NEXT_PUBLIC_SERVER_LABEL?.trim() || getApiBase();
  return { configured: true, lat, lng, label };
}
