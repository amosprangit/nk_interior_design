import { Link } from 'react-router-dom';
import { BRAND } from '../config.js';

// Full-screen photo with the brand mark, a heading and a row of large tabs.
export default function BackgroundScreen({ image, title, subtitle, tabs, back }) {
  return (
    <main className="screen">
      <div className="screen__bg" key={image} style={{ backgroundImage: `url(${image})` }} />
      <div className="screen__shade" />

      <header className="screen__top">
        <Link to="/" className="brand" aria-label={`${BRAND.name} home`}>
          <svg viewBox="0 0 120 120" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" aria-hidden="true">
            <path d="M30 96V54a30 30 0 0 1 60 0v42M44 96V56a16 16 0 0 1 32 0v40M18 96h84" />
          </svg>
          <span>{BRAND.name}</span>
        </Link>
        {back && <Link to={back.to} className="back">{back.label}</Link>}
      </header>

      <section className="screen__body">
        <div className="screen__intro">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <nav className="tabs" aria-label="Main">
          {tabs.map((t) => (
            <Link key={t.slug} to={t.to} className="tab">
              <span>{t.label}</span>
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
