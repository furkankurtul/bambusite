import { renderProductsPage } from "@/components/pages/ProductsPage";
import { getPageMetadata } from "@/i18n/metadata";

export const metadata = getPageMetadata("en", "products");

export default function EnglishProductsPage() {
  return renderProductsPage("en");
}
