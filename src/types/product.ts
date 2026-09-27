export const PRODUCT_CATEGORIES = [
  "Toys",
  "Fidget",
  "Decoration",
  "Functional",
  "Custom",
  "Other",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const PRODUCT_MATERIALS = [
  "PLA",
  "PETG",
  "TPU",
  "ABS",
  "ASA",
  "Resin",
  "Other",
] as const;

export type ProductMaterial = (typeof PRODUCT_MATERIALS)[number];

export const PRODUCT_CURRENCIES = ["TRY", "EUR", "USD"] as const;

export type ProductCurrency = (typeof PRODUCT_CURRENCIES)[number];

export interface ProductColor {
  readonly name: string;
  readonly hex: string;
}

export interface ProductLocalizedContent {
  readonly tr: {
    readonly name: string;
    readonly shortDescription: string;
    readonly description: string;
  };
  readonly en: {
    readonly name: string;
    readonly shortDescription: string;
    readonly description: string;
  };
}

export interface ProductDimensions {
  readonly width?: number;
  readonly height?: number;
  readonly depth?: number;
  readonly unit: "mm";
}

export interface ProductModelConfig {
  readonly unit?: "mm";
  readonly initialRotation?: readonly [number, number, number];
  readonly scale?: number;
}

export interface Product {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly category: ProductCategory;
  readonly shortDescription: string;
  readonly description: string;
  readonly localized?: ProductLocalizedContent;
  readonly thumbnail: string;
  readonly images?: readonly string[];
  readonly model?: string;
  readonly modelConfig?: ProductModelConfig;
  readonly colors?: readonly ProductColor[];
  readonly material?: ProductMaterial;
  readonly dimensions?: ProductDimensions;
  /** Estimated print duration in minutes. */
  readonly printTime?: number;
  readonly price?: number;
  readonly currency?: ProductCurrency;
  readonly featured?: boolean;
  readonly customizable?: boolean;
  readonly active: boolean;
  readonly tags?: readonly string[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
}
