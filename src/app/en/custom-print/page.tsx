import type { Metadata } from "next";
import { renderCustomPrintPage } from "@/components/pages/CustomPrintPage";

export const metadata: Metadata = {
  title: "Custom 3D Print Request",
  description: "Request a custom 3D print for your model or idea.",
};

export default function EnglishCustomPrintPage() {
  return renderCustomPrintPage("en");
}
