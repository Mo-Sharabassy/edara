"use client";

import React from "react";
import { geoOrthographic, geoPath, geoGraticule10, geoDistance } from "d3-geo";
import { easeCubicInOut } from "d3-ease";
import { interpolate } from "d3-interpolate";
import { loadLand, loadBorders } from "@/lib/worldGeo";
import type { EdaraEvent } from "@/data/events";

/**
 * EventGlobe — a rotating 3D globe (d3-geo orthographic on canvas) with a pin
 * per event. Drag to spin; selecting an event flies the globe to its location.
 */
type GlobeState = {
  rot: [number, number, number];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  land: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  borders: any;
  size: number;
  mode: "idle" | "flying" | "drag";
  fly: { from: number[]; to: number[]; t0: number; dur: number } | null;
  drag: { x: number; y: number; rot: number[]; moved: number } | null;
  pins: { id: string; x: number; y: number; visible: boolean }[];
  raf: number;
};

export function EventGlobe({
  events,
  selectedId,
  onSelect,
}: {
  events: EdaraEvent[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const state = React.useRef<GlobeState>({
    rot: [-10, -20, 0],
    land: null,
    borders: null,
    size: 480,
    mode: "idle",
    fly: null,
    drag: null,
    pins: [],
    raf: 0,
  });

  // selectedId → fly to that location
  React.useEffect(() => {
    const ev = events.find((e) => e.id === selectedId);
    if (!ev) return;
    const s = state.current;
    s.fly = { from: s.rot.slice(), to: [-ev.lng, -ev.lat, 0], t0: performance.now(), dur: 1000 };
    s.mode = "flying";
  }, [selectedId, events]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = state.current;
    let disposed = false;

    function measure() {
      if (!stage || !canvas || !ctx) return;
      const w = Math.min(stage.clientWidth, 620);
      s.size = w;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = w * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = w + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);

    // Load world geometry (vendored JSON, memoised loaders)
    loadLand().then((l) => {
      if (!disposed) s.land = l;
    });
    loadBorders().then((b) => {
      if (!disposed) s.borders = b;
    });

    const C = {
      ocean: "#06224d",
      oceanEdge: "#0a3a7a",
      graticule: "rgba(120,170,255,0.13)",
      land: "#123e7d",
      landLine: "#2f6bd6",
      border: "rgba(150,190,255,0.22)",
      pin: "#4285f4",
      pinActive: "#ffffff",
      pinRing: "rgba(66,133,244,0.9)",
    };

    function render() {
      if (!ctx) return;
      const size = s.size,
        r = size / 2 - 8;
      const projection = geoOrthographic()
        .scale(r)
        .translate([size / 2, size / 2])
        .rotate(s.rot)
        .clipAngle(90);
      const path = geoPath(projection, ctx);
      ctx.clearRect(0, 0, size, size);

      // ocean sphere + glow rim
      ctx.beginPath();
      path({ type: "Sphere" });
      const g = ctx.createRadialGradient(size * 0.4, size * 0.36, r * 0.2, size / 2, size / 2, r);
      g.addColorStop(0, "#0a3168");
      g.addColorStop(1, C.ocean);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = C.oceanEdge;
      ctx.stroke();

      // graticule
      ctx.beginPath();
      path(geoGraticule10());
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = C.graticule;
      ctx.stroke();

      // land
      if (s.land) {
        ctx.beginPath();
        path(s.land);
        ctx.fillStyle = C.land;
        ctx.fill();
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = C.landLine;
        ctx.stroke();
      }
      if (s.borders) {
        ctx.beginPath();
        path(s.borders);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = C.border;
        ctx.stroke();
      }

      // pins
      const center: [number, number] = [-s.rot[0], -s.rot[1]];
      s.pins = [];
      events.forEach((ev) => {
        const visible = geoDistance([ev.lng, ev.lat], center) < Math.PI / 2;
        const xy = projection([ev.lng, ev.lat]);
        if (!xy) return;
        s.pins.push({ id: ev.id, x: xy[0], y: xy[1], visible });
        if (!visible) return;
        const active = ev.id === selectedId;
        if (active) {
          ctx.beginPath();
          ctx.arc(xy[0], xy[1], 9, 0, 2 * Math.PI);
          ctx.fillStyle = "rgba(255,255,255,0.18)";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(xy[0], xy[1], 5.5, 0, 2 * Math.PI);
          ctx.strokeStyle = C.pinRing;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(xy[0], xy[1], active ? 4 : 3, 0, 2 * Math.PI);
        ctx.fillStyle = active ? C.pinActive : C.pin;
        ctx.fill();
      });
    }

    function tick(now: number) {
      if (disposed) return;
      if (s.mode === "flying" && s.fly) {
        const k = Math.min(1, (now - s.fly.t0) / s.fly.dur);
        const e = easeCubicInOut(k);
        const iv = interpolate(s.fly.from, s.fly.to);
        s.rot = iv(e) as [number, number, number];
        if (k >= 1) {
          s.mode = "idle";
          s.fly = null;
        }
      } else if (s.mode === "idle") {
        s.rot = [s.rot[0] + 0.12, s.rot[1], 0];
      }
      render();
      s.raf = requestAnimationFrame(tick);
    }
    s.raf = requestAnimationFrame(tick);

    // drag to spin
    function down(e: PointerEvent) {
      s.drag = { x: e.clientX, y: e.clientY, rot: s.rot.slice(), moved: 0 };
      s.mode = "drag";
      canvas!.setPointerCapture(e.pointerId);
    }
    function move(e: PointerEvent) {
      if (!s.drag) return;
      const dx = e.clientX - s.drag.x,
        dy = e.clientY - s.drag.y;
      s.drag.moved += Math.abs(dx) + Math.abs(dy);
      const k = 0.28;
      s.rot = [
        s.drag.rot[0] + dx * k,
        Math.max(-85, Math.min(85, s.drag.rot[1] - dy * k)),
        0,
      ];
    }
    function up(e: PointerEvent) {
      const wasDrag = s.drag && s.drag.moved > 6;
      s.drag = null;
      s.mode = "idle";
      if (!wasDrag) {
        const rect = canvas!.getBoundingClientRect();
        const mx = e.clientX - rect.left,
          my = e.clientY - rect.top;
        let best: string | null = null,
          bestD = 16;
        s.pins.forEach((p) => {
          if (!p.visible) return;
          const d = Math.hypot(p.x - mx, p.y - my);
          if (d < bestD) {
            bestD = d;
            best = p.id;
          }
        });
        if (best) onSelect(best);
      }
    }
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);

    return () => {
      disposed = true;
      cancelAnimationFrame(s.raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
    };
    // selectedId handled via ref effect above
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, onSelect]);

  return (
    <div className="ek-globe-stage" ref={stageRef}>
      <div className="ek-globe-glow" />
      <canvas ref={canvasRef} className="ek-globe-canvas" />
      <p className="ek-globe-hint">Drag to spin · tap a pin to explore</p>
    </div>
  );
}

export default EventGlobe;
