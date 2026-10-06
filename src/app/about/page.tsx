import { renderAboutPage } from "@/components/pages/AboutPage";
import { getPageMetadata } from "@/i18n/metadata";

export const metadata = getPageMetadata("tr", "about");

export default function AboutPage() {
  return renderAboutPage("tr");
}
