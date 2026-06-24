import React from "react";

/**
 * Edara Card — the base surface. Rests on a hairline border with NO shadow
 * (a brand signature); elevation is reserved for the `interactive` hover lift.
 */
type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  raised?: boolean;
};

export function Card({
  children,
  interactive = false,
  raised = false,
  className = "",
  style = {},
  ...rest
}: CardProps) {
  const cls = [
    "edara-card",
    raised ? "edara-card--raised" : "",
    interactive ? "edara-card--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} style={style} {...rest}>
      {children}
    </div>
  );
}

export default Card;
