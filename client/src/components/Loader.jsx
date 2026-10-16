import { useEffect, useState } from 'react';
import { BRAND } from '../config.js';

const REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const DRAW_MS = REDUCED ? 600 : 2600; // logo draws + counter runs
const EXIT_MS = REDUCED ? 300 : 1100; // curtain lifts

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / DRAW_MS, 1);
      setCount(Math.round(p * p * (3 - 2 * p) * 100)); // eased 0 → 100
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const t1 = setTimeout(() => setExiting(true), DRAW_MS + 250);
    const t2 = setTimeout(() => { document.body.style.overflow = ''; onDone(); }, DRAW_MS + 250 + EXIT_MS);
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); document.body.style.overflow = ''; };
  }, [onDone]);

  return (
    <div className={`loader ${exiting ? 'is-exiting' : ''}`} role="status" aria-label="Loading">
      <div className="loader__panel loader__panel--top" />
      <div className="loader__panel loader__panel--bottom" />

      <div className="loader__content">
        {/* Replace this SVG with your real logo. Keep pathLength="1" on shapes to keep the draw animation. */}
        <svg className="loader__logo" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path pathLength="1" d="M30 96V54a30 30 0 0 1 60 0v42" />
          <path pathLength="1" d="M44 96V56a16 16 0 0 1 32 0v40" />
          <path pathLength="1" d="M18 96h84" />
          <path pathLength="1" d="M60 40v56" />
        </svg>
        <div className="loader__name" aria-hidden="true">
          {BRAND.name.split('').map((ch, i) => (
            <span key={i} style={{ animationDelay: `${1.1 + i * 0.06}s` }}>{ch === ' ' ? '\u00A0' : ch}</span>
          ))}
        </div>
        <div className="loader__count">{String(count).padStart(3, '0')}</div>
      </div>
    </div>
  );
}
