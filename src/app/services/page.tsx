import type { Metadata } from "next";
import { ServicesScreen } from "@/components/screens/ServicesScreen";

export const metadata: Metadata = {
  title: "Services — Edara",
  description:
    "Everything between the brief and the breakdown: exhibition booths, sponsorships and speaking slots, venue and vendor logistics — planned, built and run by Edara.",
};

export default function Page() {
  return <ServicesScreen />;
}
