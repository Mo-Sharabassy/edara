/** Cross-route handoff of a selected pricing plan (Pricing → Contact). */
export type SelectedPlan = {
  name: string;
  price: string;
  billing: string;
  /** Appended after price in the chip (e.g. "/mo"). Pass "" to omit. Default: "/mo". */
  suffix?: string;
  /** If set, used as the Contact form default message instead of the generated template. */
  message?: string;
};

const KEY = "edaraPlan";

export function savePlan(plan: SelectedPlan) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(plan));
  } catch {
    /* storage unavailable — ignore */
  }
}

export function readPlan(): SelectedPlan | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SelectedPlan) : null;
  } catch {
    return null;
  }
}

export function clearPlan() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
