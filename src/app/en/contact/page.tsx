import { renderContactPage } from "@/components/pages/ContactPage";
import { getPageMetadata } from "@/i18n/metadata";

export const metadata = getPageMetadata("en", "contact");

export default function EnglishContactPage() {
  return renderContactPage("en");
}
