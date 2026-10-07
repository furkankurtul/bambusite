// Replace these placeholders when the project identity is decided.
export const siteConfig = {
  name: "3D Print Catalog",
  description: "Explore 3D printed products and start a custom print request.",
  siteUrl: "",
  instagramUrl: "https://www.instagram.com/REPLACE_ME/",
  whatsappNumber: "+905368431710",
  email: "hello@example.com",
  productInquiryCopy: {
    greeting: "Hello,",
    interestLine: "I'm interested in the {productName}.",
    colorLabel: "Color",
    materialLabel: "Material",
    productLabel: "Product",
  },
  primaryNavigation: [
    { label: "Products", href: "/products" },
    { label: "Custom Print", href: "/custom-print" },
    { label: "Guide", href: "/guide" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
