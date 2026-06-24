/** Cross-route handoff of a selected pricing plan (Pricing → Contact). */
export type SelectedPlan = { name: string; price: string; billing: string };

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
