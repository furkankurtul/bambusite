import type { Metadata } from "next";
import { renderFaqPage } from "@/components/pages/FaqPage";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about custom 3D printing, materials, models, colors, and production details.",
};

export default function EnglishFaqPage() {
  return renderFaqPage("en");
}
