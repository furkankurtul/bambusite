import type { Locale } from "./index";

export function localePrefix(locale: Locale): string {
  return locale === "en" ? "/en" : "";
}

export function localizedPath(locale: Locale, path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const prefix = localePrefix(locale);
  return `${prefix}${normalized === "/" ? "" : normalized}` || "/";
}

export function switchLocalePath(
  pathname: string,
  search: string,
  target: Locale,
): string {
  const withoutLocale =
    pathname === "/en" || pathname.startsWith("/en/")
      ? pathname.slice(3) || "/"
      : pathname;
  const path = localizedPath(target, withoutLocale);
  return `${path}${search}`;
}
