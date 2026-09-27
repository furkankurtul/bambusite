import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProductDetailInteraction } from "@/components/product/ProductDetailInteraction";
import { createPublicUrl } from "@/config/deployment";
import { ProductDetails } from "@/components/product/ProductDetails";
import {
  ProductGallery,
  type ProductGalleryItem,
} from "@/components/product/ProductGallery";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { siteConfig } from "@/config/site";
import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "@/lib/products";
import {
  resolveProductImageSources,
  resolveProductThumbnailSources,
} from "@/lib/products/media";
import { resolvePublicAsset } from "@/lib/public-assets";
import type { Product } from "@/types/product";

interface ProductPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const thumbnail = await resolvePublicAsset(product.thumbnail);
  const openGraphImage = thumbnail
    ? createPublicUrl(thumbnail, siteConfig.siteUrl)
    : undefined;

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      type: "website",
      ...(openGraphImage
        ? { images: [{ url: openGraphImage, alt: product.name }] }
        : {}),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const [galleryItems, relatedProducts] = await Promise.all([
    resolveGalleryItems(product),
    getRelatedProducts(product, 3),
  ]);
  const relatedThumbnailSources =
    await resolveProductThumbnailSources(relatedProducts);

  return (
    <main className="min-h-svh bg-[#f7f7f5]">
      <div className="mx-auto max-w-[90rem] px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-zinc-500">
            <li>
              <Link
                className="inline-flex items-center gap-1.5 rounded-md font-medium hover:text-zinc-950"
                href="/products"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="truncate text-zinc-700">
              {product.name}
            </li>
          </ol>
        </nav>

        <ProductDetailInteraction product={product} />

        <div className="mt-20 space-y-20 sm:mt-24 sm:space-y-24">
          <section aria-labelledby="product-photos-heading">
            <SectionHeading
              eyebrow="Gallery"
              heading="Product photos"
              id="product-photos-heading"
            />
            <div className="max-w-5xl">
              <ProductGallery items={galleryItems} productName={product.name} />
            </div>
          </section>

          <section
            aria-labelledby="product-description-heading"
            className="grid gap-6 border-t border-zinc-200 pt-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-16"
          >
            <SectionHeading
              eyebrow="Overview"
              heading="About this product"
              id="product-description-heading"
            />
            <p className="max-w-3xl text-lg leading-8 text-zinc-700">
              {product.description}
            </p>
          </section>

          <section aria-labelledby="product-details-heading">
            <SectionHeading
              eyebrow="Specifications"
              heading="Product details"
              id="product-details-heading"
            />
            <ProductDetails product={product} />
          </section>

          <RelatedProducts
            products={relatedProducts}
            thumbnailSources={relatedThumbnailSources}
          />
        </div>
      </div>
    </main>
  );
}

interface SectionHeadingProps {
  readonly eyebrow: string;
  readonly heading: string;
  readonly id: string;
}

function SectionHeading({ eyebrow, heading, id }: SectionHeadingProps) {
  return (
    <div className="mb-7">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
        {eyebrow}
      </p>
      <h2
        className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl"
        id={id}
      >
        {heading}
      </h2>
    </div>
  );
}

async function resolveGalleryItems(
  product: Product,
): Promise<readonly ProductGalleryItem[]> {
  const imagePaths = [
    ...new Set([product.thumbnail, ...(product.images ?? [])]),
  ];
  const sources = await resolveProductImageSources(imagePaths);
  const availableItems = imagePaths.flatMap((imagePath) => {
    const src = sources[imagePath];
    return src ? [{ id: imagePath, src }] : [];
  });

  return availableItems.length > 0
    ? availableItems
    : [{ id: product.thumbnail }];
}
