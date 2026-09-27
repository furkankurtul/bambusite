import type { ProductMaterial } from "@/types/product";

export type CustomPrintRequest = {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly description: string;
  readonly quantity: number;
  readonly color: string;
  readonly material: ProductMaterial;
  readonly dimensions: string;
  readonly attachmentName?: string;
};

/**
 * Deliberately local demo boundary. Replace this with a server action or API
 * client when request delivery is introduced.
 */
export async function createCustomPrintRequest(
  request: CustomPrintRequest,
): Promise<{ status: "demo" }> {
  void request;
  return { status: "demo" };
}
