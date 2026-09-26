import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  searchProducts,
} from "./index";
import { validateProductCatalog } from "./validation";

export interface ProductCheckResult {
  readonly name: string;
  readonly passed: boolean;
}

function hasIssue(
  issues: ReturnType<typeof validateProductCatalog>,
  text: string,
) {
  return issues.some((issue) => issue.message.includes(text));
}

export async function runProductArchitectureChecks(): Promise<
  readonly ProductCheckResult[]
> {
  const products = await getAllProducts();
  const first = products[0];

  if (!first)
    throw new Error("Product checks require at least one sample product.");

  const plainProducts: Record<string, unknown>[] = products.map((product) => ({
    ...product,
  }));
  const duplicateSlugIssues = validateProductCatalog([
    ...plainProducts,
    { ...plainProducts[1], id: "unique-check-id", slug: first.slug },
  ]);
  const duplicateIdIssues = validateProductCatalog([
    ...plainProducts,
    { ...plainProducts[1], id: first.id, slug: "unique-check-slug" },
  ]);
  const invalidCategoryIssues = validateProductCatalog([
    { ...first, category: "Invalid category" },
  ]);
  const invalidColorIssues = validateProductCatalog([
    { ...first, colors: [{ name: "Broken", hex: "red" }] },
  ]);
  const searchResults = await searchProducts("  ARTICULATED   creature ");
  const relatedResults = await getRelatedProducts(first, 3);
  const inactiveProduct = products.find((product) => !product.active);
  const hiddenLookup = inactiveProduct
    ? await getProductBySlug(inactiveProduct.slug)
    : undefined;

  const checks: readonly ProductCheckResult[] = [
    {
      name: "Duplicate slugs are detected",
      passed: hasIssue(duplicateSlugIssues, "Duplicate slug"),
    },
    {
      name: "Duplicate IDs are detected",
      passed: hasIssue(duplicateIdIssues, "Duplicate id"),
    },
    {
      name: "Invalid categories are detected",
      passed: hasIssue(invalidCategoryIssues, "Category must be one of"),
    },
    {
      name: "Invalid colors are detected",
      passed: hasIssue(invalidColorIssues, "#RGB or #RRGGBB"),
    },
    {
      name: "Search is case-insensitive and whitespace tolerant",
      passed:
        searchResults.length > 0 &&
        searchResults.every((product) => product.tags?.includes("articulated")),
    },
    {
      name: "Related products exclude the source product",
      passed: relatedResults.every((product) => product.id !== first.id),
    },
    {
      name: "Public lookup excludes inactive products",
      passed: inactiveProduct !== undefined && hiddenLookup === undefined,
    },
  ];

  const failures = checks.filter((check) => !check.passed);
  if (failures.length > 0) {
    throw new Error(
      `Product architecture checks failed: ${failures.map((check) => check.name).join(", ")}`,
    );
  }

  return checks;
}
