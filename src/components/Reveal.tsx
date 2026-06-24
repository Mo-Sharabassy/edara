"use client";

import React from "react";

/**
 * Reveal — wraps content and fades/rises it in once scrolled into view.
 * Content already in view at mount reveals immediately so the top of the page
 * never depends on a scroll/IntersectionObserver tick.
 */
type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
};

export function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
  style = {},
  ...rest
}: RevealProps & React.HTMLAttributes<HTMLElement>) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [seen, setSeen] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    // Already in view at mount (e.g. above-the-fold) → reveal immediately.
    const r = el.getBoundingClientRect();
    if (r.top < (window.innerHeight || 0) * 0.93 && r.bottom > 0) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? "is-in" : ""} ${className}`.trim()}
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
