"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ds/Button";
import { EdaraLogo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/nav";

/**
 * MobileNav — sticky bar + slide-in drawer for < 768px.
 */
export function MobileNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function nav(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <div className="ek-mnav">
        <div className="ek-mnav__inner">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}
          >
            <EdaraLogo height={26} />
            <span className="edara-nav__tag">EVENTS AS A SERVICE</span>
          </Link>
          <button
            className={"ek-burger" + (open ? " is-open" : "")}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={"ek-drawer" + (open ? " is-open" : "")} aria-hidden={!open}>
        <div className="ek-drawer__top">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer", display: "inline-flex" }}
          >
            <EdaraLogo height={26} />
          </Link>
          <button className="ek-burger is-open" onClick={() => setOpen(false)} aria-label="Close menu">
            <span />
            <span />
            <span />
          </button>
        </div>
        <nav className="ek-drawer__links">
          {NAV_LINKS.map((l) => {
            const active = l.href === pathname;
            return (
              <a
                key={l.href}
                className={"ek-drawer__link" + (active ? " ek-drawer__link--active" : "")}
                onClick={() => nav(l.href)}
              >
                {l.label}
                <span className="material-symbols-outlined">arrow_outward</span>
              </a>
            );
          })}
        </nav>
        <div className="ek-drawer__cta">
          <Button variant="primary" block onClick={() => nav("/contact")}>
            Book a Strategy Call
          </Button>
        </div>
        <p className="ek-drawer__meta">Edara · Your Event Department, on Demand</p>
      </div>
    </>
  );
}

export default MobileNav;
