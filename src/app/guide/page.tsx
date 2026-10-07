import { renderGuidePage } from "@/components/pages/GuidePage";
import { getPageMetadata } from "@/i18n/metadata";

export const metadata = getPageMetadata("tr", "guide");

export default function GuidePage() {
  return renderGuidePage("tr");
}
