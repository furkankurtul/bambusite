import type { Metadata } from "next";
import { renderAboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About 3D Printing",
  description:
    "Explore 3D printed products, custom production, prototypes, and functional parts.",
};

export default function EnglishAboutPage() {
  return renderAboutPage("en");
}
