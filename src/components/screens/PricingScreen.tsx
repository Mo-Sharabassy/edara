"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ds/Button";
import { PricingCard } from "@/components/ds/PricingCard";
import { Badge } from "@/components/ds/Badge";
import { savePlan } from "@/lib/plan";

/**
 * Pricing screen — two partnership models:
 *   • Department — a fixed fractional events department, billed quarterly.
 *   • Agency     — 15% of managed event spend, performance-aligned, no retainer.
 */
type DeptTier = {
  id: string;
  tier: string;
  name: string;
  monthly: number;
  featured?: boolean;
  description: React.ReactNode;
  features: string[];
  cta: string;
};

const DEPT_TIERS: DeptTier[] = [
  {
    id: "planner",
    tier: "Entry",
    name: "Planner",
    monthly: 3300,
    description: "For teams testing the waters — Running 3-5 events a year.",
    features: ["Events planning", "Booth & vendor logistics", "Sponsorships negotiation"],
    cta: "Partner with Planner",
  },
  {
    id: "department",
    tier: "Most teams partner here",
    name: "Fractional",
    monthly: 5700,
    featured: true,
    description: (
      <>
        Our core partnership — a fractional events department running up to 7 events a year.
        <br />
        <br />
        Everything Planner +
      </>
    ),
    features: [
      "Dedicated event manager",
      "Custom booth design & build",
      "ROI & data reporting",
      "On-site support",
    ],
    cta: "Partner with Fractional",
  },
  {
    id: "fractional",
    tier: "Scale",
    name: "Unlimited",
    monthly: 9900,
    description: (
      <>
        Unlimited strategic planning and execution for 8+ global roadshows — a department without
        the headcount.
        <br />
        <br />
        Everything Fractional +
      </>
    ),
    features: ["Strategic planning and management", "Travel included", "Unlimited event logistics"],
    cta: "Partner with Unlimited",
  },
];

const money = (n: number) => "€" + Math.round(n).toLocaleString();

function ModelToggle({
  model,
  setModel,
}: {
  model: string;
  setModel: (m: string) => void;
}) {
  const options = [
    { id: "agency", label: "Agency", sub: "15% of managed spend" },
    { id: "department", label: "Department", sub: "Fixed quarterly partnership" },
  ];
  return (
    <div className="ek-modeltoggle" role="tablist" aria-label="Partnership model">
      {options.map((m) => (
        <button
          key={m.id}
          role="tab"
          aria-selected={model === m.id}
          className={"ek-modeltoggle__opt" + (model === m.id ? " is-active" : "")}
          onClick={() => setModel(m.id)}
        >
          <span className="ek-modeltoggle__label">{m.label}</span>
          <span className="ek-modeltoggle__sub">{m.sub}</span>
        </button>
      ))}
    </div>
  );
}

function AgencyModel({ onContact }: { onContact: () => void }) {
  const includes = [
    {
      icon: "schedule",
      t: "Save time from day one",
      d: "Skip the learning curve. An experienced events department picks up the brief and runs.",
    },
    {
      icon: "trending_up",
      t: "Scale while saving cost",
      d: "Go bigger without building an in-house events team. We bring the manager, the crew and the vendor network.",
    },
    {
      icon: "receipt_long",
      t: "One transparent line",
      d: "Booth, sponsorship, venue and logistics rolled into a single 15% fee. No project markups, no surprises.",
    },
  ];
  return (
    <div className="ek-agencymodel">
      <Reveal className="ek-agencycard">
        <div className="ek-agencycard__figure">
          <span className="ek-agencycard__pct">
            15<small>%</small>
          </span>
          <p className="ek-agencycard__cap">of managed event spend</p>
          <Badge variant="soft">Performance-aligned</Badge>
        </div>
        <div className="ek-agencycard__body">
          <h3 className="ek-h3" style={{ marginTop: 0 }}>
            Partner on performance
          </h3>
          <p className="ek-lead" style={{ marginBottom: 24 }}>
            Pay as you grow. Edara charges a flat 15% of the budget we manage on your behalf — We
            make sure every dollar of that budget work harder for you.
          </p>
          <Button variant="primary" size="lg" icon="arrow_forward" onClick={onContact}>
            Custom partnership
          </Button>
        </div>
      </Reveal>
      <div className="ek-grid3" style={{ marginTop: 40 }}>
        {includes.map((it, i) => (
          <Reveal key={it.t} delay={i * 0.08} className="ek-value">
            <span className="ek-value__icon material-symbols-outlined">{it.icon}</span>
            <h4 className="ek-value__t">{it.t}</h4>
            <p className="ek-value__d">{it.d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function DepartmentModel({ onContact }: { onContact: () => void }) {
  const [chosen, setChosen] = React.useState<string | null>(null);
  const chosenTier = DEPT_TIERS.find((t) => t.id === chosen);

  function choose(p: DeptTier) {
    setChosen(p.id);
    savePlan({
      name: p.name,
      price: money(p.monthly),
      billing: "Billed quarterly · " + money(p.monthly * 3) + " per quarter",
    });
  }
  function continueBooking() {
    if (chosenTier) choose(chosenTier);
    onContact();
  }

  return (
    <div>
      <Reveal style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
        <span className="ek-savechip" style={{ fontSize: 12, padding: "8px 16px" }}>
          A fixed events department · billed once every quarter
        </span>
      </Reveal>
      <div className="ek-grid3 ek-grid3--stretch">
        {DEPT_TIERS.map((p) => (
          <PricingCard
            key={p.id}
            tier={p.tier}
            name={p.name}
            price={money(p.monthly)}
            per={"/mo · billed quarterly"}
            description={p.description}
            features={p.features}
            cta={chosen === p.id ? "Selected ✓" : p.cta}
            featured={p.featured}
            onSelect={() => choose(p)}
            style={
              chosen === p.id && !p.featured
                ? {
                    borderColor: "var(--primary)",
                    boxShadow: "0 0 0 2px var(--primary), var(--shadow-card-hover)",
                  }
                : undefined
            }
          />
        ))}
      </div>

      {chosenTier && (
        <div style={{ marginTop: 40 }}>
          <div className="ek-selectbar">
            <div className="ek-selectbar__inner">
              <div className="ek-selectbar__txt">
                <span className="ek-selectbar__check material-symbols-outlined">check</span>
                <div>
                  <p className="ek-selectbar__t">
                    {chosenTier.name} · {money(chosenTier.monthly)}/mo
                  </p>
                  <p className="ek-selectbar__s">
                    Billed quarterly · {money(chosenTier.monthly * 3)} per quarter
                  </p>
                </div>
              </div>
              <div className="ek-selectbar__act">
                <Button variant="glass" onClick={() => setChosen(null)}>
                  Clear
                </Button>
                <Button variant="inverse" icon="arrow_forward" onClick={continueBooking}>
                  Continue to booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PricingScreen() {
  const router = useRouter();
  const goContact = () => router.push("/contact");
  const [model, setModel] = React.useState("agency");

  return (
    <div data-screen-label="Pricing" className="ek-route">
      <section className="ek-prhero">
        <div className="ek-container ek-prhero__inner">
          <h1 className="ek-display ek-prhero__title">Explore our pricing models</h1>
          <p className="ek-lead ek-prhero__sub">
            A full events department without the overhead — choose the model that fits how you work.
          </p>
        </div>
      </section>

      <section className="ek-section ek-sunken">
        <div className="ek-container">
          <Reveal style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
            <ModelToggle model={model} setModel={setModel} />
          </Reveal>
          {model === "agency" ? (
            <AgencyModel onContact={goContact} />
          ) : (
            <DepartmentModel onContact={goContact} />
          )}
        </div>
      </section>

      {/* Why partner with Edara at all */}
      <section className="ek-section ek-surface">
        <div className="ek-container" style={{ maxWidth: 1200 }}>
          <Reveal className="ek-section__head ek-section__head--left">
            <h2 className="ek-h2">The economics of partnership</h2>
            <p className="ek-lead">Why leading companies choose us.</p>
          </Reveal>
          <Reveal className="ek-tablewrap">
            <table className="ek-table">
              <thead>
                <tr>
                  <th className="ek-table__h">Comparison</th>
                  <th className="ek-table__h ek-table__h--muted">Full-time Hires</th>
                  <th className="ek-table__h ek-table__h--muted">Traditional Agency</th>
                  <th className="ek-table__h ek-table__h--brand">Edara Partnership</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Cost structure",
                    "€100k+ salary + benefits",
                    "15–20% commission + fees",
                    "Retainer fee or a fixed 15%",
                  ],
                  [
                    "Budget control",
                    "Hidden internal costs",
                    "Uncapped project fees",
                    "Fully transparent, predictable",
                  ],
                  [
                    "Integration",
                    "Slow onboarding",
                    "External vendor friction",
                    "Seamless internal extension",
                  ],
                ].map((r) => (
                  <tr key={r[0]}>
                    <td className="ek-table__row-h">{r[0]}</td>
                    <td className="ek-table__cell">{r[1]}</td>
                    <td className="ek-table__cell">{r[2]}</td>
                    <td className="ek-table__cell ek-table__cell--brand">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="ek-ambient">
        <div className="ek-container ek-ambient__inner">
          <div>
            <h2 className="ek-ambient__title">Not sure which partnership fits?</h2>
            <p className="ek-ambient__sub">
              Book a call and we&apos;ll model both against your actual event calendar.
            </p>
          </div>
          <div className="ek-ambient__cta">
            <Button variant="inverse" size="lg" icon="arrow_forward" onClick={goContact}>
              Book a Strategy Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PricingScreen;
