import type { Metadata } from "next";
import { renderContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about products and custom 3D printing.",
};

export default function EnglishContactPage() {
  return renderContactPage("en");
}
