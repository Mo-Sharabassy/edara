"use client";

import React from "react";
import { createPortal } from "react-dom";
import { EventGlobe } from "@/components/EventGlobe";
import { Reveal } from "@/components/Reveal";
import { EDARA_EVENTS } from "@/data/events";

/**
 * HomePortfolio — leads the home page with Edara's real, worldwide track record
 * via an interactive globe + detail panel.
 */
export function HomePortfolio() {
  const events = EDARA_EVENTS;
  const [selectedId, setSelectedId] = React.useState(events[0]?.id);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const onSelect = React.useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  React.useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  React.useEffect(() => {
    document.body.style.overflowY = lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflowY = ""; };
  }, [lightboxOpen]);
  const selected = events.find((e) => e.id === selectedId) || events[0];
  if (!selected) return null;

  return (
    <div className="ek-portfolio-block">
      {/* Intro (dark — reads as one block with the portfolio globe below) */}
      <section className="ek-section ek-pf-head ek-pf-head--dark ek-pf-head--hero">
        <div className="ek-container">
          <Reveal>
            <div className="ek-hero-row">
              <div className="ek-hero-text">
                <div className="ek-hero-lockup">
                  <h2 className="ek-display ek-hero-display">
                    Your events,
                    <br />
                    <span className="ek-wordpop ek-wordpop--1">handled</span>.
                  </h2>
                  <div className="ek-hero-calligraphy" aria-hidden="true">
                    <svg viewBox="0 0 520 300" role="img" aria-label="Edara written in Arabic calligraphy">
                      <text x="260" y="205" className="ek-calligraphy-text" textAnchor="middle">
                        إداره
                      </text>
                    </svg>
                  </div>
                </div>
                <p className="ek-lead ek-hero-lead">
                  We plan, build and manage your presence at the world&apos;s best events — spin the
                  globe to explore our portfolio.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Globe explorer (dark) */}
      <section className="ek-globe-sec ek-globe-sec--joined">
        <div className="ek-container ek-globe-grid">
          <EventGlobe events={events} selectedId={selectedId} onSelect={onSelect} />

          <div className="ek-globe-panel">
            <div className="ek-evdetail">
              <div
                className="ek-evdetail__media"
                style={{ backgroundImage: `url(${selected.image})`, backgroundPosition: selected.pos || "center" }}
                role="button"
                tabIndex={0}
                aria-label="Open full-screen photo"
                onClick={() => setLightboxOpen(true)}
                onKeyDown={(e) => e.key === "Enter" && setLightboxOpen(true)}
              >
                <span className="ek-evdetail__cat">{selected.category}</span>
              </div>

              <div className="ek-evdetail__body">
                <p className="ek-evdetail__loc">
                  <span className="material-symbols-outlined">location_on</span>
                  {selected.city} · {selected.year}
                </p>
                <h3 className="ek-evdetail__title">{selected.name}</h3>
                <p className="ek-evdetail__blurb">{selected.blurb}</p>
                <div className="ek-evdetail__stats">
                  <div>
                    <strong>{selected.attendees}</strong>
                    <span>Attendees</span>
                  </div>
                  <div>
                    <strong>{selected.booth}</strong>
                    <span>Footprint</span>
                  </div>
                  <div>
                    <strong>{selected.year}</strong>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ek-evlist-head">
              <span className="ek-evlist-label">All locations · {events.length}</span>
            </div>
            <div className="ek-evlist">
              {events.map((ev) => (
                <button
                  key={ev.id}
                  className={"ek-evrow" + (ev.id === selectedId ? " ek-evrow--active" : "")}
                  onClick={() => setSelectedId(ev.id)}
                >
                  <span className="ek-evrow__dot" />
                  <span className="ek-evrow__name">{ev.name}</span>
                  <span className="ek-evrow__city">{ev.city}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      {mounted && lightboxOpen && createPortal(
        <div
          className="ek-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Event photo"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="ek-lightbox__img"
            style={{ backgroundImage: `url(${selected.image})`, backgroundPosition: selected.pos || "center" }}
          />
          <button className="ek-lightbox__close" aria-label="Close photo" onClick={() => setLightboxOpen(false)}>
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}

export default HomePortfolio;
