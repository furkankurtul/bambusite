import { renderContactPage } from "@/components/pages/ContactPage";
import { getPageMetadata } from "@/i18n/metadata";

export const metadata = getPageMetadata("tr", "contact");

export default function ContactPage() {
  return renderContactPage("tr");
}
