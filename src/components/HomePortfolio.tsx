"use client";

import React from "react";
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
  const [zoomed, setZoomed] = React.useState(false);
  const onSelect = React.useCallback((id: string) => {
    setSelectedId(id);
    setZoomed(false);
  }, []);
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
                <h2 className="ek-display ek-hero-display">
                  Your events,
                  <br />
                  <span className="ek-wordpop ek-wordpop--1">handled</span>.
                </h2>
                <p className="ek-lead ek-hero-lead">
                  We plan, build and manage your presence at the world&apos;s best events — spin the
                  globe to explore our portfolio.
                </p>
              </div>
              <div className="ek-hero-calligraphy" aria-hidden="true">
                <svg viewBox="0 0 520 300" role="img" aria-label="Edara written in Arabic calligraphy">
                  <text x="260" y="205" className="ek-calligraphy-text" textAnchor="middle">
                    إداره
                  </text>
                </svg>
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
                className={"ek-evdetail__media" + (zoomed ? " is-zoomed" : "")}
                style={{ backgroundImage: `url(${selected.image})`, backgroundPosition: selected.pos || "center" }}
                role="button"
                tabIndex={0}
                aria-label="Magnify photo"
                onClick={() => setZoomed((z) => !z)}
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
    </div>
  );
}

export default HomePortfolio;
