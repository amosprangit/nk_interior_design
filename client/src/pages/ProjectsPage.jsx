import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Carousel from "../components/Carousel.jsx";
import {
  API_URL,
  BACKGROUNDS,
  BRAND,
  LOGO,
  MAIN_TABS,
  SUB_TABS,
} from "../config.js";

export default function ProjectsPage() {
  const { section, category } = useParams();
  const sectionTab = MAIN_TABS.find((t) => t.slug === section);
  const categoryTab = SUB_TABS.find((t) => t.slug === category);

  const [state, setState] = useState({ status: "loading", projects: [] });

  useEffect(() => {
    if (!sectionTab || !categoryTab) return;
    const ctrl = new AbortController();
    setState({ status: "loading", projects: [] });
    const region =
      section === "india" || section === "global" ? `&region=${section}` : "";
    fetch(`${API_URL}/api/projects?category=${category}${region}`, {
      signal: ctrl.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((json) => setState({ status: "ready", projects: json.data }))
      .catch((e) => {
        if (e.name !== "AbortError")
          setState({ status: "error", projects: [] });
      });
    window.scrollTo(0, 0);
    return () => ctrl.abort();
  }, [section, category]);

  if (!sectionTab || !categoryTab) return <Navigate to="/" replace />;
  const other = SUB_TABS.find((t) => t.slug !== category);

  return (
    <div className="projects">
      <header
        className="projects__hero"
        style={{ backgroundImage: `url(${BACKGROUNDS[category]})` }}
      >
        <div className="screen__shade" />
        <div className="screen__top">
          <Link to="/" className="brand">
            <img src={LOGO} alt={BRAND.name} />
          </Link>
          <Link to={`/${section}`} className="back">
            Back
          </Link>
        </div>
        <div className="projects__heading">
          <h1>{categoryTab.label}</h1>
          <p>{sectionTab.label}</p>
        </div>
      </header>

      <div className="projects__list">
        {state.status === "loading" && (
          <p className="note">Loading projects…</p>
        )}
        {state.status === "error" && (
          <p className="note">
            We couldn't load the projects. Check that the server is running on
            port 5000 and refresh.
          </p>
        )}
        {state.status === "ready" && state.projects.length === 0 && (
          <p className="note">No projects here yet. Please check back soon.</p>
        )}

        {state.projects.map((p) => (
          <article className="project" key={p.slug}>
            <Carousel media={p.media} title={p.title} />
            <div className="project__info">
              <h2>{p.title}</h2>
              <p className="project__meta">
                {[p.location, p.year, p.area].filter(Boolean).join(", ")}
              </p>
              <p className="project__desc">{p.description}</p>
            </div>
          </article>
        ))}

        <footer className="projects__foot">
          <Link to={`/${section}/${other.slug}`}>
            View {other.label.toLowerCase()} projects
          </Link>
        </footer>
      </div>
    </div>
  );
}
