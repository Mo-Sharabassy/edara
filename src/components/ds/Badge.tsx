import React from "react";

/**
 * Edara Badge — a small pill label. `solid` is the brand "Most Popular" tag;
 * `soft` is a tinted status pill; `outline` is a bordered variant.
 */
export type BadgeVariant = "solid" | "soft" | "outline";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({
  children,
  variant = "solid",
  className = "",
  style = {},
  ...rest
}: BadgeProps) {
  const base: React.CSSProperties = {
    display: "inline-block",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    padding: "6px 16px",
    borderRadius: "var(--radius-pill)",
    border: "1px solid transparent",
    whiteSpace: "nowrap",
  };
  const variants: Record<BadgeVariant, React.CSSProperties> = {
    solid: { background: "var(--primary)", color: "var(--on-primary)" },
    soft: { background: "var(--tint-brand-10)", color: "var(--text-brand)" },
    outline: {
      background: "transparent",
      color: "var(--on-surface-variant)",
      borderColor: "var(--border-subtle)",
    },
  };
  return (
    <span className={className} style={{ ...base, ...variants[variant], ...style }} {...rest}>
      {children}
    </span>
  );
}

export default Badge;
