"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ds/Button";
import { EdaraLogo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/nav";

/**
 * Top navigation — replicates the DS NavBar markup/classes but swaps the static
 * two-bar mark for the animated EdaraLogo (spinning globe + wordmark).
 */
export function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className="edara-nav edara-nav--sticky">
      <div className="edara-nav__inner">
        <Link href="/" className="edara-nav__brand" style={{ textDecoration: "none" }}>
          <EdaraLogo height={32} />
          <span className="edara-nav__tag">EVENTS AS A SERVICE</span>
        </Link>
        <div className="edara-nav__links">
          {NAV_LINKS.map((l) => {
            const active = l.href === pathname;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={"edara-nav__link" + (active ? " edara-nav__link--active" : "")}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <Button variant="primary" size="sm" onClick={() => router.push("/contact")}>
          Contact us
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;
