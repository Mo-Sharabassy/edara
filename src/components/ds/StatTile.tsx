"use client";

import React from "react";

/**
 * Edara StatTile — a count-up metric tile. `solid` is the brand-fill inverse
 * variant; `bordered` is the surface variant with a primary number. Animates
 * 0 → value over 2s on scroll into view (honours prefers-reduced-motion).
 */
type StatTileProps = React.HTMLAttributes<HTMLDivElement> & {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  variant?: "solid" | "bordered";
  duration?: number;
};

export function StatTile({
  value,
  suffix = "",
  prefix = "",
  label,
  variant = "solid",
  duration = 2000,
  ...rest
}: StatTileProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let start = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          obs.unobserve(node);
          const tick = (t: number) => {
            if (!start) start = t;
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3); // ease-out
            setDisplay(Math.round(value * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => {
      obs.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  const isSolid = variant === "solid";
  const wrap: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "40px",
    borderRadius: "var(--radius-lg)",
    minHeight: "160px",
    background: isSolid ? "var(--primary)" : "var(--surface-container)",
    color: isSolid ? "var(--on-primary)" : "var(--on-surface)",
    border: isSolid ? "none" : "1px solid var(--border-subtle)",
  };
  const num: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "56px",
    lineHeight: "64px",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    margin: 0,
    color: isSolid ? "var(--on-primary)" : "var(--primary)",
  };
  const cap: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    marginTop: "8px",
    color: isSolid ? "rgba(255,255,255,0.8)" : "var(--on-surface-variant)",
  };

  return (
    <div ref={ref} style={wrap} {...rest}>
      <h3 style={num}>
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </h3>
      <p style={cap}>{label}</p>
    </div>
  );
}

export default StatTile;
