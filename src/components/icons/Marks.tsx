/**
 * Original abstract line-art marks used as stand-ins for real photography/video
 * across the site until Connect4Scale supplies actual footage and stills.
 * All render at `currentColor` so they inherit their container's accent tone.
 */

export function ApertureMark() {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="100" cy="100" r="90" />
      <circle cx="100" cy="100" r="60" />
      <circle cx="100" cy="100" r="30" />
      <path d="M100 10 L100 190 M10 100 L190 100 M35 35 L165 165 M165 35 L35 165" />
    </svg>
  );
}

export function ClapperMark() {
  return (
    <svg viewBox="0 0 200 160" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="10" y="40" width="180" height="110" rx="4" />
      <path d="M10 40 L40 10 L190 10 L160 40 Z" />
      <path d="M55 10 L25 40 M100 10 L70 40 M145 10 L115 40" />
    </svg>
  );
}

export function LensMark() {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="100" cy="100" r="95" />
      <circle cx="100" cy="100" r="70" />
      <circle cx="100" cy="100" r="70" strokeDasharray="2 6" />
      <circle cx="100" cy="100" r="14" fill="currentColor" fillOpacity="0.12" />
    </svg>
  );
}

export function WaveMark() {
  return (
    <svg viewBox="0 0 300 60" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M0 30 Q 15 5 30 30 T 60 30 T 90 30 T 120 30 T 150 30 T 180 30 T 210 30 T 240 30 T 270 30 T 300 30" />
    </svg>
  );
}

export function GridMark() {
  return (
    <svg viewBox="0 0 200 200" stroke="currentColor" strokeWidth="0.6" opacity="0.7">
      <path d="M0 40H200M0 80H200M0 120H200M0 160H200M40 0V200M80 0V200M120 0V200M160 0V200" />
    </svg>
  );
}

export function BarsMark() {
  return (
    <svg viewBox="0 0 200 140" fill="currentColor" opacity="0.85">
      <rect x="10" y="70" width="18" height="60" />
      <rect x="40" y="40" width="18" height="90" />
      <rect x="70" y="90" width="18" height="40" />
      <rect x="100" y="20" width="18" height="110" />
      <rect x="130" y="55" width="18" height="75" />
      <rect x="160" y="10" width="18" height="120" />
    </svg>
  );
}

export function CircuitMark() {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M20 40H80V90H140V40H180" />
      <path d="M20 100H60V160H120V100H180" />
      <circle cx="80" cy="90" r="4" fill="currentColor" />
      <circle cx="140" cy="40" r="4" fill="currentColor" />
      <circle cx="60" cy="160" r="4" fill="currentColor" />
      <circle cx="120" cy="100" r="4" fill="currentColor" />
    </svg>
  );
}

export function RaysMark() {
  return (
    <svg viewBox="0 0 200 200" stroke="currentColor" strokeWidth="1" opacity="0.75">
      <path d="M100 100 L100 0 M100 100 L172 28 M100 100 L200 100 M100 100 L172 172 M100 100 L100 200 M100 100 L28 172 M100 100 L0 100 M100 100 L28 28" />
      <circle cx="100" cy="100" r="18" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BlobMark() {
  return (
    <svg viewBox="0 0 200 200" fill="currentColor" opacity="0.85">
      <path d="M45 60 Q80 10 130 30 Q180 50 165 100 Q150 150 100 165 Q45 180 30 130 Q15 90 45 60Z" />
    </svg>
  );
}

export function FilmMark() {
  return (
    <svg viewBox="0 0 240 60" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2" y="2" width="236" height="56" rx="4" />
      <g fill="currentColor" stroke="none">
        <rect x="10" y="8" width="10" height="10" /><rect x="10" y="42" width="10" height="10" />
        <rect x="40" y="8" width="10" height="10" /><rect x="40" y="42" width="10" height="10" />
        <rect x="70" y="8" width="10" height="10" /><rect x="70" y="42" width="10" height="10" />
        <rect x="100" y="8" width="10" height="10" /><rect x="100" y="42" width="10" height="10" />
        <rect x="130" y="8" width="10" height="10" /><rect x="130" y="42" width="10" height="10" />
        <rect x="160" y="8" width="10" height="10" /><rect x="160" y="42" width="10" height="10" />
        <rect x="190" y="8" width="10" height="10" /><rect x="190" y="42" width="10" height="10" />
        <rect x="220" y="8" width="10" height="10" /><rect x="220" y="42" width="10" height="10" />
      </g>
      <path d="M35 30H205" strokeDasharray="3 5" />
    </svg>
  );
}

export const MARKS = {
  aperture: ApertureMark,
  clapper: ClapperMark,
  lens: LensMark,
  wave: WaveMark,
  grid: GridMark,
  bars: BarsMark,
  circuit: CircuitMark,
  rays: RaysMark,
  blob: BlobMark,
  film: FilmMark,
} as const;

export type MarkName = keyof typeof MARKS;
