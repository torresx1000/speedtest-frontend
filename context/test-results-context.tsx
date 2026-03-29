"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "vi-speedtest-results";
const WINDOW_MS = 5 * 60 * 1000;

export type SpeedTestRecord = {
  id: string;
  at: number;
  pingMs: number;
  jitterMs: number;
  downloadMbps: number;
  uploadMbps: number;
  serverUrl: string;
};

function prune(records: SpeedTestRecord[], now = Date.now()): SpeedTestRecord[] {
  const cutoff = now - WINDOW_MS;
  return records.filter((r) => r.at >= cutoff).sort((a, b) => b.at - a.at);
}

function loadFromStorage(): SpeedTestRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return prune(
      parsed.filter(
        (x): x is SpeedTestRecord =>
          x !== null &&
          typeof x === "object" &&
          typeof (x as SpeedTestRecord).id === "string" &&
          typeof (x as SpeedTestRecord).at === "number"
      )
    );
  } catch {
    return [];
  }
}

function saveToStorage(records: SpeedTestRecord[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    /* ignore quota */
  }
}

export type NewSpeedTestRecord = Omit<SpeedTestRecord, "id" | "at"> & {
  id?: string;
  at?: number;
};

type Ctx = {
  records: SpeedTestRecord[];
  addResult: (r: NewSpeedTestRecord) => void;
  windowMs: number;
};

const TestResultsContext = createContext<Ctx | null>(null);

export function TestResultsProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<SpeedTestRecord[]>([]);

  useEffect(() => {
    setRecords(loadFromStorage());
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRecords((prev) => {
        const next = prune(prev);
        if (next.length !== prev.length) saveToStorage(next);
        return next;
      });
    }, 15_000);
    return () => window.clearInterval(id);
  }, []);

  const addResult = useCallback((input: NewSpeedTestRecord) => {
      const row: SpeedTestRecord = {
        id: input.id ?? crypto.randomUUID(),
        at: input.at ?? Date.now(),
        pingMs: input.pingMs,
        jitterMs: input.jitterMs,
        downloadMbps: input.downloadMbps,
        uploadMbps: input.uploadMbps,
        serverUrl: input.serverUrl,
      };
      setRecords((prev) => {
        const next = prune([row, ...prev]);
        saveToStorage(next);
        return next;
      });
  }, []);

  const value = useMemo(
    () => ({ records, addResult, windowMs: WINDOW_MS }),
    [records, addResult]
  );

  return (
    <TestResultsContext.Provider value={value}>{children}</TestResultsContext.Provider>
  );
}

export function useTestResults() {
  const ctx = useContext(TestResultsContext);
  if (!ctx) throw new Error("useTestResults debe usarse dentro de TestResultsProvider");
  return ctx;
}
