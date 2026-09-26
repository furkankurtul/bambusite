import {
  PRODUCT_CATEGORIES,
  PRODUCT_CURRENCIES,
  PRODUCT_MATERIALS,
  type Product,
} from "@/types/product";
import { isValidHexColor, isValidProductSlug } from "./utils";

export interface ProductValidationIssue {
  readonly path: string;
  readonly message: string;
}

const IMAGE_PATH_PATTERN =
  /^\/products\/[a-z0-9-]+\/[a-z0-9-]+\.(?:avif|jpe?g|png|webp)$/i;
const MODEL_PATH_PATTERN = /^\/models\/[a-z0-9-]+\.stl$/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function addRequiredStringIssue(
  product: Record<string, unknown>,
  field: "id" | "slug" | "name" | "shortDescription" | "description",
  index: number,
  issues: ProductValidationIssue[],
): void {
  if (!hasNonEmptyString(product[field])) {
    issues.push({
      path: `products[${index}].${field}`,
      message: `${field} must be a non-empty string.`,
    });
  }
}

export function validateProductCatalog(
  value: unknown,
): ProductValidationIssue[] {
  const issues: ProductValidationIssue[] = [];

  if (!Array.isArray(value)) {
    return [{ path: "products", message: "Product catalog must be an array." }];
  }

  const seenIds = new Map<string, number>();
  const seenSlugs = new Map<string, number>();

  value.forEach((candidate, index) => {
    if (!isRecord(candidate)) {
      issues.push({
        path: `products[${index}]`,
        message: "Product must be an object.",
      });
      return;
    }

    for (const field of [
      "id",
      "slug",
      "name",
      "shortDescription",
      "description",
    ] as const) {
      addRequiredStringIssue(candidate, field, index, issues);
    }

    if (hasNonEmptyString(candidate.id)) {
      const previousIndex = seenIds.get(candidate.id);
      if (previousIndex !== undefined) {
        issues.push({
          path: `products[${index}].id`,
          message: `Duplicate id "${candidate.id}" (first used at products[${previousIndex}]).`,
        });
      } else {
        seenIds.set(candidate.id, index);
      }
    }

    if (hasNonEmptyString(candidate.slug)) {
      if (!isValidProductSlug(candidate.slug)) {
        issues.push({
          path: `products[${index}].slug`,
          message: "Slug must use lowercase kebab-case.",
        });
      }

      const previousIndex = seenSlugs.get(candidate.slug);
      if (previousIndex !== undefined) {
        issues.push({
          path: `products[${index}].slug`,
          message: `Duplicate slug "${candidate.slug}" (first used at products[${previousIndex}]).`,
        });
      } else {
        seenSlugs.set(candidate.slug, index);
      }
    }

    if (
      typeof candidate.category !== "string" ||
      !PRODUCT_CATEGORIES.includes(
        candidate.category as (typeof PRODUCT_CATEGORIES)[number],
      )
    ) {
      issues.push({
        path: `products[${index}].category`,
        message: `Category must be one of: ${PRODUCT_CATEGORIES.join(", ")}.`,
      });
    }

    if (
      typeof candidate.thumbnail !== "string" ||
      !IMAGE_PATH_PATTERN.test(candidate.thumbnail)
    ) {
      issues.push({
        path: `products[${index}].thumbnail`,
        message: "Thumbnail must be a public-relative product image path.",
      });
    }

    if (
      candidate.model !== undefined &&
      (typeof candidate.model !== "string" ||
        !MODEL_PATH_PATTERN.test(candidate.model))
    ) {
      issues.push({
        path: `products[${index}].model`,
        message: "Model must be a public-relative .stl path under /models.",
      });
    }

    if (candidate.images !== undefined) {
      if (!Array.isArray(candidate.images)) {
        issues.push({
          path: `products[${index}].images`,
          message: "Images must be an array.",
        });
      } else {
        candidate.images.forEach((image, imageIndex) => {
          if (typeof image !== "string" || !IMAGE_PATH_PATTERN.test(image)) {
            issues.push({
              path: `products[${index}].images[${imageIndex}]`,
              message: "Image must be a public-relative product image path.",
            });
          }
        });
      }
    }

    if (candidate.colors !== undefined) {
      if (!Array.isArray(candidate.colors)) {
        issues.push({
          path: `products[${index}].colors`,
          message: "Colors must be an array.",
        });
      } else {
        candidate.colors.forEach((color, colorIndex) => {
          if (!isRecord(color) || !hasNonEmptyString(color.name)) {
            issues.push({
              path: `products[${index}].colors[${colorIndex}].name`,
              message: "Color name must be a non-empty string.",
            });
          }
          if (
            !isRecord(color) ||
            typeof color.hex !== "string" ||
            !isValidHexColor(color.hex)
          ) {
            issues.push({
              path: `products[${index}].colors[${colorIndex}].hex`,
              message: "Color must use #RGB or #RRGGBB hex format.",
            });
          }
        });
      }
    }

    if (
      candidate.material !== undefined &&
      (typeof candidate.material !== "string" ||
        !PRODUCT_MATERIALS.includes(
          candidate.material as (typeof PRODUCT_MATERIALS)[number],
        ))
    ) {
      issues.push({
        path: `products[${index}].material`,
        message: `Material must be one of: ${PRODUCT_MATERIALS.join(", ")}.`,
      });
    }

    if (
      candidate.price !== undefined &&
      (typeof candidate.price !== "number" || candidate.price < 0)
    ) {
      issues.push({
        path: `products[${index}].price`,
        message: "Price must be a non-negative number.",
      });
    }

    if (
      candidate.currency !== undefined &&
      (typeof candidate.currency !== "string" ||
        !PRODUCT_CURRENCIES.includes(
          candidate.currency as (typeof PRODUCT_CURRENCIES)[number],
        ))
    ) {
      issues.push({
        path: `products[${index}].currency`,
        message: `Currency must be one of: ${PRODUCT_CURRENCIES.join(", ")}.`,
      });
    }

    if (typeof candidate.active !== "boolean") {
      issues.push({
        path: `products[${index}].active`,
        message: "Active must be a boolean.",
      });
    }
  });

  return issues;
}

export function assertValidProductCatalog(
  products: readonly Product[],
): asserts products is readonly Product[] {
  const issues = validateProductCatalog(products);
  if (issues.length === 0) return;

  const details = issues
    .map((issue) => `- ${issue.path}: ${issue.message}`)
    .join("\n");
  throw new Error(`Invalid product catalog:\n${details}`);
}
