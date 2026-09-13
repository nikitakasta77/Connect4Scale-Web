/**
 * Fixed, full-viewport video background for the entire site. Sits behind all
 * content (z-index -1) — every section's background is transparent/glass, so
 * this shows through everywhere, not just in the Hero.
 */
export function SiteBackgroundVideo() {
  return (
    <div className="site-bg-video" aria-hidden="true">
      <video autoPlay muted loop playsInline preload="auto">
        <source src="/videos/site-bg.mp4" type="video/mp4" />
      </video>
      <div className="site-bg-video-scrim" />
    </div>
  );
}
