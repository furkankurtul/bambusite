import type { Metadata } from "next";
import type { Locale } from "./index";

type StaticPage =
  "about" | "contact" | "customPrint" | "faq" | "home" | "products";

const pageMetadata: Record<
  Locale,
  Record<StaticPage, { description: string; title: string }>
> = {
  en: {
    home: {
      title: "3D Print Catalog",
      description: "Explore 3D printed products and request a custom print.",
    },
    products: {
      title: "Products",
      description:
        "Explore available 3D printed products and customizable designs.",
    },
    customPrint: {
      title: "Custom 3D Print Request",
      description: "Preview a custom 3D print request for your model or idea.",
    },
    about: {
      title: "About 3D Printing",
      description:
        "Explore the catalog's focus on 3D printed products, prototypes, and functional parts.",
    },
    faq: {
      title: "Frequently Asked Questions",
      description:
        "Answers about 3D printing materials, models, colors, and production details.",
    },
    contact: {
      title: "Contact",
      description:
        "View configured contact options for products and custom 3D printing.",
    },
  },
  tr: {
    home: {
      title: "3D Baskı Kataloğu",
      description:
        "3D baskılı ürünleri inceleyin veya özel baskı talebinizi ön izleyin.",
    },
    products: {
      title: "Ürünler",
      description:
        "Mevcut 3D baskılı ürünleri ve özelleştirilebilir tasarımları inceleyin.",
    },
    customPrint: {
      title: "Özel 3D Baskı Talebi",
      description:
        "Modeliniz veya fikriniz için özel 3D baskı talebini ön izleyin.",
    },
    about: {
      title: "3D Baskı Hakkında",
      description:
        "Kataloğun 3D baskılı ürünler, prototipler ve fonksiyonel parçalara odaklanışını inceleyin.",
    },
    faq: {
      title: "Sık Sorulan Sorular",
      description:
        "3D baskı malzemeleri, modeller, renkler ve üretim ayrıntıları hakkındaki yanıtlar.",
    },
    contact: {
      title: "İletişim",
      description:
        "Ürünler ve özel 3D baskı için yapılandırılmış iletişim seçeneklerini inceleyin.",
    },
  },
};

export function getPageMetadata(locale: Locale, page: StaticPage): Metadata {
  const entry = pageMetadata[locale][page];
  return {
    title: entry.title,
    description: entry.description,
    openGraph: {
      title: entry.title,
      description: entry.description,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
  };
}
