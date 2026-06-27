"use client";

import React from "react";
import Link from "next/link";
import { EdaraLogo } from "@/components/Logo";
import { FOOTER_LINKS } from "@/lib/nav";

/**
 * Footer — replicates the DS Footer markup/classes but uses the animated
 * EdaraLogo (muted) instead of the static two-bar mark.
 */
export function Footer() {
  return (
    <footer className="edara-footer">
      <div className="edara-footer__inner">
        <Link href="/" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
          <EdaraLogo height={28} tone="muted" />
          <span className="edara-nav__tag">EVENTS AS A SERVICE</span>
        </Link>
        <div className="edara-footer__links">
          {FOOTER_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="edara-footer__link">
              {l.label}
            </Link>
          ))}
        </div>
        <p className="edara-footer__copy">
          © 2026 Edara Events. Your Professional Event Department.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
