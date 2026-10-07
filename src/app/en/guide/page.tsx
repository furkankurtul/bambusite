import { renderGuidePage } from "@/components/pages/GuidePage";
import { getPageMetadata } from "@/i18n/metadata";

export const metadata = getPageMetadata("en", "guide");

export default function EnglishGuidePage() {
  return renderGuidePage("en");
}
