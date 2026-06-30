import type { Metadata } from "next";
import { PricingScreen } from "@/components/screens/PricingScreen";

export const metadata: Metadata = {
  title: "Pricing — Edara",
  description:
    "Two ways to partner: a flat 12% Agency model, or a fixed fractional events Department billed quarterly (Planner €3,000, Fractional €5,000, Unlimited €8,000 / mo).",
};

export default function Page() {
  return <PricingScreen />;
}
