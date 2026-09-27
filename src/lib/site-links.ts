export function getConfiguredExternalUrl(value?: string): string | undefined {
  if (!value || value.includes("REPLACE_ME")) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

export function getConfiguredEmailHref(value?: string): string | undefined {
  if (!value || /@example\.com$/i.test(value)) return undefined;
  return `mailto:${value}`;
}
