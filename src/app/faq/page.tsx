import { renderFaqPage } from "@/components/pages/FaqPage";
import { getPageMetadata } from "@/i18n/metadata";

export const metadata = getPageMetadata("tr", "faq");

export default function FaqPage() {
  return renderFaqPage("tr");
}
