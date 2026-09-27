function normalizeBasePath(value: string | undefined): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

function getSafeSiteUrl(value: string | undefined): URL | undefined {
  if (!value?.trim()) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url
      : undefined;
  } catch {
    return undefined;
  }
}

export const deploymentConfig = {
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "",
} as const;

export function withBasePath(path: string): string {
  if (!path.startsWith("/") || !deploymentConfig.basePath) return path;
  if (
    path === deploymentConfig.basePath ||
    path.startsWith(`${deploymentConfig.basePath}/`)
  ) {
    return path;
  }
  return `${deploymentConfig.basePath}${path}`;
}

export function createPublicUrl(
  path: string,
  configuredSiteUrl?: string,
): string | undefined {
  const siteUrl = getSafeSiteUrl(deploymentConfig.siteUrl || configuredSiteUrl);
  const routePath = path.startsWith("/") ? path : `/${path}`;

  if (siteUrl) {
    const configuredPath = siteUrl.pathname.replace(/\/+$/, "");
    return `${siteUrl.origin}${configuredPath || deploymentConfig.basePath}${routePath}`;
  }

  if (typeof window === "undefined") return undefined;
  return new URL(withBasePath(routePath), window.location.origin).toString();
}
