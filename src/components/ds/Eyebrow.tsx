import React from "react";

/**
 * Edara Eyebrow — the monospace, uppercase category label above headings.
 * Three forms: plain, chip (tinted capsule), and numbered (NN + hairline +
 * category) used above service pillars.
 */
export type EyebrowVariant = "plain" | "chip" | "numbered";
export type EyebrowTone = "brand" | "muted";

type EyebrowProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: EyebrowVariant;
  number?: string;
  tone?: EyebrowTone;
};

export function Eyebrow({
  children,
  variant = "plain",
  number,
  tone = "brand",
  className = "",
  style = {},
  ...rest
}: EyebrowProps) {
  const color = tone === "brand" ? "var(--text-brand)" : "var(--on-surface-variant)";
  const base: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color,
  };

  if (variant === "chip") {
    return (
      <span
        className={className}
        style={{
          ...base,
          display: "inline-block",
          background: tone === "brand" ? "var(--tint-brand-10)" : "var(--secondary-container)",
          color: tone === "brand" ? "var(--text-brand)" : "var(--on-secondary-container)",
          padding: "6px 12px",
          borderRadius: "var(--radius-pill)",
          ...style,
        }}
        {...rest}
      >
        {children}
      </span>
    );
  }

  if (variant === "numbered") {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "center", gap: "8px", ...style }}
        {...rest}
      >
        <span style={{ ...base, color: "var(--tertiary)" }}>{number}</span>
        <span style={{ height: "1px", width: "32px", background: "var(--border-subtle)" }} />
        <span style={{ ...base }}>{children}</span>
      </span>
    );
  }

  return (
    <span className={className} style={{ ...base, ...style }} {...rest}>
      {children}
    </span>
  );
}

export default Eyebrow;
