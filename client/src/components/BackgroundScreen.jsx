import { Link } from "react-router-dom";
import { BRAND, LOGO } from "../config.js";

export default function BackgroundScreen({
  image,
  title,
  subtitle,
  tabs,
  back,
}) {
  return (
    <main className="screen">
      <div
        className="screen__bg"
        key={image}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="screen__shade" />

      <header className="screen__top">
        <Link to="/" className="brand" aria-label={`${BRAND.name} home`}>
          <img src={LOGO} alt={BRAND.name} />
        </Link>
        <nav className="tabs" aria-label="Main">
          {tabs.map((t) => (
            <Link key={t.slug} to={t.to} className="tab">
              <span>{t.label}</span>
            </Link>
          ))}
        </nav>
      </header>

      <section className="screen__body">
        <div className="screen__intro">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
          {back && (
            <Link to={back.to} className="back">
              {back.label}
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
