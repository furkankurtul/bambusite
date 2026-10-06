import { renderHome } from "@/components/pages/HomePage";
import { getPageMetadata } from "@/i18n/metadata";

export const metadata = getPageMetadata("en", "home");

export default function EnglishHome() {
  return renderHome("en");
}
