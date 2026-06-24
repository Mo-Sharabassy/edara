"use client";

import React from "react";

/** Accordion item — animated max-height reveal driven by the inner content height. */
export function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  const innerRef = React.useRef<HTMLDivElement>(null);
  return (
    <div className="ek-faqitem">
      <button className={"ek-faqq" + (open ? " is-open" : "")} onClick={onToggle}>
        {q}
        <span className="material-symbols-outlined">add</span>
      </button>
      <div
        className="ek-faqa"
        style={{ maxHeight: open && innerRef.current ? innerRef.current.scrollHeight + "px" : 0 }}
      >
        <div className="ek-faqa__inner" ref={innerRef}>
          {a}
        </div>
      </div>
    </div>
  );
}

export default FaqItem;
