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
  const uid = React.useId();
  const answerId = `faq-answer-${uid}`;
  return (
    <div className="ek-faqitem">
      <button
        className={"ek-faqq" + (open ? " is-open" : "")}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={answerId}
      >
        {q}
        <span className="material-symbols-outlined" aria-hidden="true">add</span>
      </button>
      <div
        id={answerId}
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
