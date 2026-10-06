import { renderAboutPage } from "@/components/pages/AboutPage";
import { getPageMetadata } from "@/i18n/metadata";

export const metadata = getPageMetadata("en", "about");

export default function EnglishAboutPage() {
  return renderAboutPage("en");
}
