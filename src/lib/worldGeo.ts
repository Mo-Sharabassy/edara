import * as topojson from "topojson-client";

/**
 * Shared, cached loaders for the world-atlas geometry used by the globe mark
 * and the portfolio globe. The JSON is vendored under /public/geo so the page
 * has no runtime CDN dependency. Promises are memoised so the geometry is only
 * fetched and decoded once per page load.
 */
let landPromise: Promise<unknown> | null = null;
let bordersPromise: Promise<unknown> | null = null;

export function loadLand(): Promise<unknown> {
  if (!landPromise) {
    landPromise = fetch("/geo/land-110m.json")
      .then((r) => r.json())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((w: any) => topojson.feature(w, w.objects.land))
      .catch(() => null);
  }
  return landPromise;
}

export function loadBorders(): Promise<unknown> {
  if (!bordersPromise) {
    bordersPromise = fetch("/geo/countries-110m.json")
      .then((r) => r.json())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((c: any) => topojson.mesh(c, c.objects.countries, (a: unknown, b: unknown) => a !== b))
      .catch(() => null);
  }
  return bordersPromise;
}
