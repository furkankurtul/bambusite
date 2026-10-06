import { renderFaqPage } from "@/components/pages/FaqPage";
import { getPageMetadata } from "@/i18n/metadata";

export const metadata = getPageMetadata("en", "faq");

export default function EnglishFaqPage() {
  return renderFaqPage("en");
}
