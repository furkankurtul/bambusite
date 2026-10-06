import { renderCustomPrintPage } from "@/components/pages/CustomPrintPage";
import { getPageMetadata } from "@/i18n/metadata";

export const metadata = getPageMetadata("en", "customPrint");

export default function EnglishCustomPrintPage() {
  return renderCustomPrintPage("en");
}
