const SCALE_POINTS: { v: number; p: number }[] = [
  { v: 0, p: 0 },
  { v: 1, p: 0.07 },
  { v: 5, p: 0.18 },
  { v: 10, p: 0.32 },
  { v: 20, p: 0.48 },
  { v: 30, p: 0.58 },
  { v: 50, p: 0.72 },
  { v: 75, p: 0.86 },
  { v: 100, p: 1 },
];

export function mbpsToGaugeProgress(mbps: number): number {
  const v = Math.max(0, mbps);
  const last = SCALE_POINTS[SCALE_POINTS.length - 1]!;
  if (v >= last.v) return 1;
  let i = 0;
  while (i < SCALE_POINTS.length - 1 && SCALE_POINTS[i + 1]!.v < v) i++;
  const a = SCALE_POINTS[i]!;
  const b = SCALE_POINTS[i + 1]!;
  const t = (v - a.v) / (b.v - a.v);
  return a.p + t * (b.p - a.p);
}

export const GAUGE_TICKS = [0, 1, 5, 10, 20, 30, 50, 75, 100] as const;
