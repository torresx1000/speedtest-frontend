export function WaveDivider() {
  return (
    <svg
      className="mx-auto h-3 w-full max-w-xs text-teal-400/80"
      viewBox="0 0 320 12"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="35%" stopColor="#a78bfa" />
          <stop offset="70%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>
      </defs>
      <path
        d="M0 6 Q40 0 80 6 T160 6 T240 6 T320 6"
        fill="none"
        stroke="url(#waveGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
