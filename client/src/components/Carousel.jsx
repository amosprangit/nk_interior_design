import { useEffect, useRef, useState } from 'react';

// Image + video carousel: arrows, keyboard (← →), swipe on touch, thumbnails.
export default function Carousel({ media = [], title }) {
  const [i, setI] = useState(0);
  const root = useRef(null);
  const touchX = useRef(null);
  const count = media.length;

  const go = (n) => count && setI((n + count) % count);
  const prev = () => go(i - 1);
  const next = () => go(i + 1);

  // Pause any video that isn't the active slide
  useEffect(() => {
    root.current?.querySelectorAll('video').forEach((v, idx) => {
      if (Number(v.dataset.index) !== i) v.pause();
    });
  }, [i]);

  if (!count) return null;

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  };
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  return (
    <div className="carousel" ref={root} tabIndex={0} onKeyDown={onKey} role="group" aria-roledescription="carousel" aria-label={title}>
      <div className="carousel__viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="carousel__track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {media.map((m, idx) => (
            <div className="carousel__slide" key={idx} aria-hidden={idx !== i}>
              {m.type === 'video' ? (
                <video data-index={idx} src={m.url} poster={m.poster} controls playsInline preload="metadata" />
              ) : (
                <img src={m.url} alt={m.caption ? `${title}: ${m.caption}` : title} loading={idx === 0 ? 'eager' : 'lazy'} draggable="false" />
              )}
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button className="carousel__btn carousel__btn--prev" onClick={prev} aria-label="Previous">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button className="carousel__btn carousel__btn--next" onClick={next} aria-label="Next">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
        <div className="carousel__count">{i + 1} / {count}</div>
      </div>

      {count > 1 && (
        <div className="carousel__thumbs">
          {media.map((m, idx) => (
            <button key={idx} className={idx === i ? 'is-active' : ''} onClick={() => go(idx)} aria-label={`Show ${m.type} ${idx + 1}`}>
              <img src={m.type === 'video' ? m.poster || m.url : m.url} alt="" loading="lazy" />
              {m.type === 'video' && <span className="thumb-play" aria-hidden="true">▶</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
