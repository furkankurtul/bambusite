export type WhatsAppProductInquiryInput = {
  readonly colorName?: string;
  readonly material?: string;
  readonly phoneNumber?: string;
  readonly productName: string;
  readonly productUrl?: string;
  readonly copy: {
    readonly greeting: string;
    readonly interestLine: string;
    readonly colorLabel: string;
    readonly materialLabel: string;
    readonly productLabel: string;
  };
};

export function normalizeWhatsAppNumber(
  phoneNumber?: string,
): string | undefined {
  if (!phoneNumber) return undefined;

  const normalized = phoneNumber.replace(/[\s()\\-]/g, "").replace(/^\+/, "");
  return /^\d+$/.test(normalized) ? normalized : undefined;
}

export function createWhatsAppUrl({
  message,
  phoneNumber,
}: {
  readonly message?: string;
  readonly phoneNumber?: string;
}): string | undefined {
  const normalizedNumber = normalizeWhatsAppNumber(phoneNumber);
  if (!normalizedNumber) return undefined;

  const baseUrl = `https://wa.me/${normalizedNumber}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}

export function createWhatsAppProductInquiry({
  colorName,
  copy,
  material,
  phoneNumber,
  productName,
  productUrl,
}: WhatsAppProductInquiryInput): string | undefined {
  const messageLines = [
    copy.greeting,
    copy.interestLine.replace("{productName}", productName),
    colorName ? `${copy.colorLabel}: ${colorName}` : undefined,
    material ? `${copy.materialLabel}: ${material}` : undefined,
    productUrl ? `${copy.productLabel}: ${productUrl}` : undefined,
  ].filter((line): line is string => Boolean(line));

  return createWhatsAppUrl({
    message: messageLines.join("\n"),
    phoneNumber,
  });
}
