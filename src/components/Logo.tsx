"use client";

import React from "react";
import { geoOrthographic, geoPath, geoGraticule10 } from "d3-geo";
import { loadLand } from "@/lib/worldGeo";

/**
 * Edara — animated globe logo mark.
 * A tiny auto-rotating orthographic globe that mirrors the Portfolio globe's
 * projection and colour palette exactly (same world-atlas land geometry).
 * Renders static (no spin) under prefers-reduced-motion.
 */
export function GlobeMark({ size = 30 }: { size?: number }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const rot: [number, number, number] = [-10, -20, 0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let land: any = null;
    let raf = 0;
    let disposed = false;
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Palette lifted verbatim from the Portfolio globe so the mark matches exactly.
    const C = {
      ocean: "#06224d",
      oceanEdge: "#0a3a7a",
      graticule: "rgba(120,170,255,0.16)",
      land: "#123e7d",
      landLine: "#2f6bd6",
    };

    function render() {
      if (!ctx) return;
      const r = size / 2 - 1;
      const projection = geoOrthographic()
        .scale(r)
        .translate([size / 2, size / 2])
        .rotate(rot)
        .clipAngle(90);
      const path = geoPath(projection, ctx);
      ctx.clearRect(0, 0, size, size);

      // ocean sphere + rim
      ctx.beginPath();
      path({ type: "Sphere" });
      const g = ctx.createRadialGradient(size * 0.4, size * 0.36, r * 0.2, size / 2, size / 2, r);
      g.addColorStop(0, "#0a3168");
      g.addColorStop(1, C.ocean);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = C.oceanEdge;
      ctx.stroke();

      // graticule
      ctx.beginPath();
      path(geoGraticule10());
      ctx.lineWidth = 0.4;
      ctx.strokeStyle = C.graticule;
      ctx.stroke();

      // land
      if (land) {
        ctx.beginPath();
        path(land);
        ctx.fillStyle = C.land;
        ctx.fill();
        ctx.lineWidth = 0.4;
        ctx.strokeStyle = C.landLine;
        ctx.stroke();
      }
    }

    function tick() {
      if (disposed) return;
      rot[0] += 0.4;
      render();
      raf = requestAnimationFrame(tick);
    }

    loadLand().then((l) => {
      if (disposed) return;
      land = l;
      render();
      if (!reduce) raf = requestAnimationFrame(tick);
    });
    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: size, height: size, display: "block", borderRadius: "50%" }}
    />
  );
}

/**
 * Brand lockup: spinning globe + "Edara" wordmark. Mirrors the DS Logo metrics.
 */
export function EdaraLogo({
  height = 32,
  tone = "brand",
  showArabic = false,
}: {
  height?: number;
  tone?: "brand" | "muted";
  showArabic?: boolean;
}) {
  const scale = height / 32;
  const muted = tone === "muted";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9 * scale,
        opacity: muted ? 0.55 : 1,
        filter: muted ? "grayscale(1)" : "none",
      }}
    >
      <GlobeMark size={Math.round(28 * scale)} />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          fontSize: 24 * scale,
          lineHeight: 1,
          color: muted ? "var(--on-surface)" : "var(--primary)",
        }}
      >
        Edara
      </span>
      {showArabic && (
        <span style={{ fontSize: 18 * scale, color: muted ? "var(--on-surface)" : "var(--primary)" }}>
          إداره
        </span>
      )}
    </span>
  );
}

export default EdaraLogo;
