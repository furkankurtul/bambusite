import type { Metadata } from "next";
import { renderHome } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: "3D Print Catalog",
  description: "Explore 3D printed products and request a custom print.",
};

export default function EnglishHome() {
  return renderHome("en");
}
