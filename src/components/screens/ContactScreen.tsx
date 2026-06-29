"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { Badge } from "@/components/ds/Badge";
import { ContactForm } from "@/components/ContactForm";
import { FaqItem } from "@/components/FaqItem";
import { readPlan, type SelectedPlan } from "@/lib/plan";

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Who is Edara?",
    a: 'Edara (إداره) is Arabic for "management." We\'re a German company with global operations — a professional event department for growing tech and AI companies, running strategy, production, sponsorship, speaking slots, merchandise and logistics end to end.',
  },
  {
    q: "Which events do we manage?",
    a: "We cover a broad range of event production and management — and we'll help you plan your event calendar, secure the right sponsorships and book the right venues. We do keep it Halal: we don't work on parties or events involving alcohol.",
  },
  {
    q: "Do you need to run events regularly to work with us?",
    a: "No. Whether it's your first activation or your tenth this year, you brief us on a single event and we run it end to end.",
  },
  {
    q: "How do we charge?",
    a: "Per event — or as a flat monthly retainer billed quarterly. Three department tiers: Planner (€3,300/mo) for 3–5 events a year, Fractional (€5,700/mo) for up to 7 events a year, and Unlimited (€9,900/mo) for 8+ global roadshows. Versus a six-figure full-time hire or 15–20% agency commissions, it's a flat retainer or a fixed 15%.",
  },
  {
    q: "What do we actually handle?",
    a: "Everything between the brief and the breakdown: events planning, booth and vendor logistics, sponsorships negotiation, custom booth design and build, ROI and data reporting, merchandise, on-site support, and — at the Unlimited tier — strategic planning and management with travel included, under one team and one point of contact.",
  },
  {
    q: "Where can we run an event?",
    a: "Edara is a German company with worldwide operations. We've delivered 50+ events across 20+ countries.",
  },
];

const INFO_ROWS: { icon: string; k: string; v: React.ReactNode }[] = [
  { icon: "mail", k: "Email", v: <a href="mailto:edaraevents@gmail.com">edaraevents@gmail.com</a> },
  { icon: "schedule", k: "Response time", v: "Within 1 business day" },
  { icon: "public", k: "Coverage", v: "Global · 20+ countries delivered" },
  { icon: "videocam", k: "Strategy call", v: "30 minutes" },
];

export function ContactScreen() {
  const [plan, setPlan] = React.useState<SelectedPlan | null>(null);
  const [openFaq, setOpenFaq] = React.useState(0);

  React.useEffect(() => {
    setPlan(readPlan());
  }, []);

  const defaultMessage = plan
    ? `I'd like to move forward with ${plan.name} (${plan.price}/mo, ${plan.billing} billing). A bit about our upcoming events: `
    : "";

  return (
    <div data-screen-label="Contact" className="ek-route ek-contactpage">
      {/* Header + split */}
      <section className="ek-section ek-contact-hero">
        <div className="ek-container ek-contactsplit">
          <aside className="ek-contactaside">
            <div>
              <h1 className="ek-display" style={{ fontSize: 48, lineHeight: "54px" }}>
                Let&apos;s plan your next event.
              </h1>
            </div>
            <p className="ek-contactaside__lead">
              Tell us where you&apos;re headed and what you need. We&apos;ll come back within one
              business day.
            </p>
            <div className="ek-infolist">
              {INFO_ROWS.map((row) => (
                <div className="ek-inforow" key={row.k}>
                  <span className="ek-inforow__icon material-symbols-outlined">{row.icon}</span>
                  <div>
                    <p className="ek-inforow__k">{row.k}</p>
                    <p className="ek-inforow__v">{row.v}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div>
            {plan && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                  flexWrap: "wrap",
                }}
              >
                <Badge variant="soft">Selected plan</Badge>
                <span
                  style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--on-surface)" }}
                >
                  {plan.name} · {plan.price}/mo · {plan.billing}
                </span>
              </div>
            )}
            <div className="ek-contactform-card">
              <ContactForm
                heading={plan ? "Confirm your details" : "Tell us about your event"}
                defaultMessage={defaultMessage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ek-section ek-offwhite">
        <div className="ek-container" style={{ maxWidth: 880 }}>
          <Reveal
            className="ek-section__head"
            style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
          >
            <Eyebrow variant="chip" tone="muted">
              FAQ
            </Eyebrow>
            <h2 className="ek-h2" style={{ marginTop: 12 }}>
              Questions, answered.
            </h2>
          </Reveal>
          <div>
            {FAQS.map((f, i) => (
              <FaqItem
                key={f.q}
                q={f.q}
                a={f.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactScreen;
