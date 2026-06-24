import type { Metadata } from "next";
import { PricingScreen } from "@/components/screens/PricingScreen";

export const metadata: Metadata = {
  title: "Pricing — Edara",
  description:
    "Two ways to partner: a flat 10% Agency model, or a fixed fractional events Department billed quarterly (Planner €3,300, Fractional €5,700, Unlimited €9,900 / mo).",
};

export default function Page() {
  return <PricingScreen />;
}
