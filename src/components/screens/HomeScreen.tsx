"use client";

import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { HomePortfolio } from "@/components/HomePortfolio";
import { AskEdara } from "@/components/AskEdara";
import { BentoCard } from "@/components/ds/BentoCard";
import { StatTile } from "@/components/ds/StatTile";

/**
 * Home screen — leads with proof, then numbers, services and the assistant.
 *   Hero → Global portfolio (globe) → Trust → Numbers → Services → Ask Edara
 */
export function HomeScreen() {
  return (
    <div data-screen-label="Home" className="ek-route">
      {/* 1 · Corporate experience — global portfolio globe */}
      <HomePortfolio />

      {/* 2 · Trust bar — social proof, high on the page */}
      <section className="ek-trust">
        <div className="ek-container">
          <Reveal>
            <p className="ek-trust__label">We&apos;ve already been on the ground at</p>
            <div className="ek-trust__row">
              {["Websummit", "Token2049", "ETHGlobal", "Money2020", "GITEX"].map((n) => (
                <span className="ek-trust__logo" key={n}>
                  {n}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 · Numbers */}
      <section className="ek-section">
        <div className="ek-container">
          <Reveal className="ek-grid4">
            <StatTile value={50} suffix="+" label="Events Managed Worldwide" variant="bordered" />
            <StatTile value={20} suffix="+" label="Countries Delivered In" variant="bordered" />
            <StatTile value={0} suffix="%" label="Logistics Failure Rate" variant="bordered" />
            <StatTile value={5} prefix="$" suffix="M+" label="Value Managed" variant="bordered" />
          </Reveal>
        </div>
      </section>

      {/* 4 · Services */}
      <section className="ek-section">
        <div className="ek-container">
          <Reveal className="ek-section__head">
            <Link href="/services" style={{ textDecoration: "none" }}>
              <h2 className="ek-h2 ek-linkh2" style={{ color: "var(--primary)", cursor: "pointer" }}>
                Explore our event services
                <span className="material-symbols-outlined ek-linkh2__arrow">arrow_forward</span>
              </h2>
            </Link>
          </Reveal>
          <div className="ek-grid3" style={{ alignItems: "stretch" }}>
            <Reveal delay={0}>
              <BentoCard
                icon="architecture"
                title="Exhibition booths"
                features={["3D design & build", "On-site production"]}
              >
                Engineered spaces that turn floor traffic into conversations — designed, built and
                managed on the ground by us.
              </BentoCard>
            </Reveal>
            <Reveal delay={0.1}>
              <BentoCard
                icon="monetization_on"
                title="Sponsorships & speakings"
                features={["Tier negotiation", "Speaking slots"]}
              >
                We audit the tiers, negotiate the placement and secure keynote and panel slots so
                your brand shows up where it counts.
              </BentoCard>
            </Reveal>
            <Reveal delay={0.2}>
              <BentoCard icon="map" title="Logistics" features={["Venues & vendors", "Run-of-show"]}>
                Venues, suppliers, and merch vendors — the complex web that decides whether an event
                lands, handled end to end.
              </BentoCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ask Edara */}
      <AskEdara />
    </div>
  );
}

export default HomeScreen;
