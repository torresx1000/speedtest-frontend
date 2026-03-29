const DEFAULT_BASE = "http://127.0.0.1:8000";

export function getApiBase(): string {
  if (typeof window === "undefined") return DEFAULT_BASE;
  const raw = process.env.NEXT_PUBLIC_API_BASE?.trim();
  return raw ? raw.replace(/\/$/, "") : DEFAULT_BASE;
}

function jitterFromSamples(ms: number[]): number {
  if (ms.length < 2) return 0;
  let sum = 0;
  for (let i = 1; i < ms.length; i++) {
    sum += Math.abs(ms[i]! - ms[i - 1]!);
  }
  return sum / (ms.length - 1);
}

/** Navegadores limitan getRandomValues a 65536 bytes por llamada (spec). */
const CRYPTO_RANDOM_MAX = 65536;

function fillRandomBytes(buf: Uint8Array): void {
  let offset = 0;
  while (offset < buf.length) {
    const len = Math.min(CRYPTO_RANDOM_MAX, buf.length - offset);
    crypto.getRandomValues(buf.subarray(offset, offset + len));
    offset += len;
  }
}

export async function measurePing(samples = 6): Promise<{ pingMs: number; jitterMs: number }> {
  const base = getApiBase();
  const latencies: number[] = [];
  for (let i = 0; i < samples; i++) {
    const t0 = performance.now();
    const res = await fetch(`${base}/ping`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Ping falló (${res.status})`);
    await res.json();
    latencies.push(performance.now() - t0);
  }
  const pingMs = latencies.reduce((a, b) => a + b, 0) / latencies.length;
  return { pingMs, jitterMs: jitterFromSamples(latencies) };
}

export async function measureDownload(
  sizeMb: number,
  onInstantMbps?: (mbps: number) => void
): Promise<number> {
  const base = getApiBase();
  const url = `${base}/download?size_mb=${sizeMb}`;
  const t0 = performance.now();
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Descarga falló (${res.status})`);
  const reader = res.body?.getReader();
  if (!reader) throw new Error("Sin cuerpo de respuesta");
  let received = 0;
  let lastT = t0;
  let lastBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.length;
    const now = performance.now();
    const dt = (now - lastT) / 1000;
    if (dt >= 0.08 && onInstantMbps) {
      const inst = ((received - lastBytes) * 8) / dt / 1_000_000;
      onInstantMbps(inst);
      lastT = now;
      lastBytes = received;
    }
  }
  const elapsed = (performance.now() - t0) / 1000;
  if (elapsed <= 0) return 0;
  return (received * 8) / elapsed / 1_000_000;
}

export function measureUpload(
  sizeBytes: number,
  onInstantMbps?: (mbps: number) => void
): Promise<number> {
  const base = getApiBase();
  const buf = new Uint8Array(sizeBytes);
  fillRandomBytes(buf);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const t0 = performance.now();
    let lastLoaded = 0;
    let lastTime = t0;

    xhr.open("POST", `${base}/upload`);
    xhr.responseType = "json";

    xhr.upload.onprogress = (e) => {
      if (!onInstantMbps || !e.lengthComputable) return;
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      const db = e.loaded - lastLoaded;
      if (dt >= 0.08 && db > 0) {
        onInstantMbps((db * 8) / dt / 1_000_000);
        lastTime = now;
        lastLoaded = e.loaded;
      }
    };

    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error(`Subida falló (${xhr.status})`));
        return;
      }
      const elapsed = (performance.now() - t0) / 1000;
      if (elapsed <= 0) {
        resolve(0);
        return;
      }
      resolve((sizeBytes * 8) / elapsed / 1_000_000);
    };

    xhr.onerror = () => reject(new Error("Error de red en subida"));
    xhr.send(buf);
  });
}
