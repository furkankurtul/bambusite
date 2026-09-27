import type { Metadata } from "next";
import {
  generateStaticParams,
  renderProductPage,
} from "@/components/pages/ProductPage";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { getLocalizedProduct } from "@/lib/products/localized";

export { generateStaticParams };

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();
  const localized = getLocalizedProduct(product, "en");
  return { title: localized.name, description: localized.shortDescription };
}

export default function EnglishProductPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  return renderProductPage({ params, locale: "en" });
}
