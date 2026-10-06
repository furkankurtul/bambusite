import { renderProductsPage } from "@/components/pages/ProductsPage";
import { getPageMetadata } from "@/i18n/metadata";

export const metadata = getPageMetadata("tr", "products");

export default async function ProductsPage() {
  return renderProductsPage("tr");
}
