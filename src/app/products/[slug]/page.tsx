import {
  generateMetadata as getProductMetadata,
  generateStaticParams,
  renderProductPage,
} from "@/components/pages/ProductPage";

export { generateStaticParams };
export const generateMetadata = getProductMetadata;
export default async function ProductPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  return renderProductPage({ params, locale: "tr" });
}
