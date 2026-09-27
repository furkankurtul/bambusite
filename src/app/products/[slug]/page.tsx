import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ProductColorList } from "@/components/product/ProductColorList";
import { ProductDetails } from "@/components/product/ProductDetails";
import {
  ProductGallery,
  type ProductGalleryItem,
} from "@/components/product/ProductGallery";
import { ProductModelPreview } from "@/components/product/ProductModelPreview";
import { ProductPrice } from "@/components/product/ProductPrice";
import { RelatedProducts } from "@/components/product/RelatedProducts";
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

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      type: "website",
      ...(thumbnail ? { images: [{ url: thumbnail, alt: product.name }] } : {}),
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

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:gap-14 xl:gap-20">
          <ProductModelPreview
            colors={product.colors}
            model={product.model}
            modelConfig={product.modelConfig}
          />

          <div className="lg:py-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
              {product.category}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-lg leading-8 text-zinc-600">
              {product.shortDescription}
            </p>

            {product.colors && product.colors.length > 0 && (
              <section aria-labelledby="available-colors" className="mt-8">
                <h2
                  className="mb-3 text-sm font-semibold text-zinc-950"
                  id="available-colors"
                >
                  Available colors
                </h2>
                <ProductColorList colors={product.colors} />
              </section>
            )}

            <div className="mt-8 border-y border-zinc-200 py-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Price
              </p>
              <ProductPrice currency={product.currency} price={product.price} />
            </div>

            {product.customizable && (
              <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-zinc-600">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-sky-700"
                />
                Color or size customization may be available.
              </p>
            )}

            <Link
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800 sm:w-auto"
              href={`/contact?product=${encodeURIComponent(product.slug)}`}
              prefetch={false}
            >
              Request this product
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

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
