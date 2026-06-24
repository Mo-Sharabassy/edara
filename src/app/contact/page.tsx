import type { Metadata } from "next";
import { ContactScreen } from "@/components/screens/ContactScreen";

export const metadata: Metadata = {
  title: "Contact — Edara",
  description:
    "Tell us where you're headed and what you need. We reply within one business day. Global coverage, 20+ countries delivered.",
};

export default function Page() {
  return <ContactScreen />;
}
