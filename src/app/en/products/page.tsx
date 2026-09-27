import type { Metadata } from "next";
import { renderProductsPage } from "@/components/pages/ProductsPage";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore printed models, functional parts, and customizable designs.",
};

export default function EnglishProductsPage() {
  return renderProductsPage("en");
}
