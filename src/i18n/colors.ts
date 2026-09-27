import type { Locale } from "./index";

const turkishColorNames: Readonly<Record<string, string>> = {
  Graphite: "Grafit",
  Crimson: "Kırmızı",
  "Bone White": "Kemik beyazı",
  "Midnight Blue": "Gece mavisi",
  Sunflower: "Ayçiçeği sarısı",
  Coral: "Mercan",
};

export function getLocalizedColorName(name: string, locale: Locale): string {
  return locale === "tr" ? (turkishColorNames[name] ?? name) : name;
}
