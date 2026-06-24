import React from "react";

/**
 * Edara Button — the brand's tactile CTA.
 * Variants: primary (default), outline, glass (over imagery), inverse (on dark/brand).
 * Sizes: sm, md, lg. Tactile: lifts on hover, pushes down on press.
 */
export type ButtonVariant = "primary" | "outline" | "glass" | "inverse";
export type ButtonSize = "sm" | "md" | "lg";

const SIZES: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: "8px 16px" },
  md: { padding: "16px 40px" },
  lg: { padding: "24px 64px" },
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  block?: boolean;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  block = false,
  className = "",
  style = {},
  ...rest
}: ButtonProps) {
  const cls = [
    "edara-btn",
    `edara-btn--${variant}`,
    block ? "edara-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const iconCls =
    icon === "arrow_forward"
      ? "material-symbols-outlined edara-btn__icon--forward"
      : "material-symbols-outlined";
  return (
    <button className={cls} style={{ ...SIZES[size], ...style }} {...rest}>
      {children}
      {icon ? <span className={iconCls}>{icon}</span> : null}
    </button>
  );
}

export default Button;
