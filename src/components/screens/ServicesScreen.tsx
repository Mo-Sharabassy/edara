"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ds/Button";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { BentoCard } from "@/components/ds/BentoCard";

/**
 * Services screen — answers the real buying questions in order:
 *   Intro → Who we are → What we handle → The real return (the shift)
 */
export function ServicesScreen() {
  const router = useRouter();
  const goPricing = () => router.push("/pricing");

  const shiftPoints = [
    {
      icon: "inventory_2",
      t: "Off your plate",
      d: "One brief goes in. A finished event comes out. You approve the direction; we run everything underneath it.",
    },
    {
      icon: "hub",
      t: "One team, every part",
      d: "Design, build, sponsorship, merch and on-site — under one roof, with a single point of contact.",
    },
    {
      icon: "sync",
      t: "Your cycle, intact",
      d: "We learn how your team already works. No reorg, no new hire, no disruption to your roadmap.",
    },
  ];

  return (
    <div data-screen-label="Services" className="ek-route">
      {/* Intro */}
      <section className="ek-prhero">
        <div className="ek-container ek-prhero__inner">
          <h1 className="ek-display ek-prhero__title">Explore our services</h1>
          <p className="ek-lead ek-prhero__sub">
            Everything between the brief and the breakdown — planned, built and run by people who
            mastered it.
          </p>
        </div>
      </section>

      {/* Who we are */}
      <section className="ek-section ek-offwhite">
        <div className="ek-container ek-pillar ek-pillar--reverse">
          <Reveal className="ek-pillar__copy">
            <Eyebrow variant="numbered" number="01">
              Who we are
            </Eyebrow>
            <h2 className="ek-h2">A professional events company</h2>
            <p className="ek-lead">
              You don&apos;t run events for a living — we do. Whether it&apos;s your first booth or
              your tenth this year, you get a senior events department without putting one on the
              payroll.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="ek-pillar__media">
            <div
              className="ek-media"
              style={{ backgroundImage: "url(/assets/images/events/handshake-paris.jpg)" }}
            />
          </Reveal>
        </div>
      </section>

      {/* What we handle */}
      <section className="ek-section ek-surface">
        <div className="ek-container">
          <Reveal className="ek-section__head">
            <Eyebrow variant="numbered" number="02">
              Our know how
            </Eyebrow>
            <h2 className="ek-h2">We handle everthing between the brief and the breakdown.</h2>
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

      {/* The real return (the shift) */}
      <section className="ek-section ek-offwhite">
        <div className="ek-container">
          <Reveal className="ek-section__head">
            <Eyebrow variant="numbered" number="03">
              Why? the real return
            </Eyebrow>
            <h2 className="ek-h2">The real return is never about cutting costs.</h2>
            <p className="ek-lead">
              The saving that matters isn&apos;t just the invoice — it&apos;s the weeks your people
              spend on planning and operations.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="ek-values" style={{ marginTop: 40 }}>
            {shiftPoints.map((p) => (
              <div className="ek-value" key={p.t}>
                <span className="ek-value__icon material-symbols-outlined">{p.icon}</span>
                <h3 className="ek-value__t">{p.t}</h3>
                <p className="ek-value__d">{p.d}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.15} className="ek-shift__cta" style={{ marginTop: 48 }}>
            <Button variant="primary" size="lg" icon="arrow_forward" onClick={goPricing}>
              Explore our pricing
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export default ServicesScreen;
