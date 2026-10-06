import { renderCustomPrintPage } from "@/components/pages/CustomPrintPage";
import { getPageMetadata } from "@/i18n/metadata";

export const metadata = getPageMetadata("tr", "customPrint");

export default function CustomPrintPage() {
  return renderCustomPrintPage("tr");
}
