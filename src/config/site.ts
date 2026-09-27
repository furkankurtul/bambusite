// Replace these placeholders when the project identity is decided.
export const siteConfig = {
  name: "3D Print Catalog",
  description: "A 3D printing product catalog. Development foundation only.",
  siteUrl: "",
  instagramUrl: "https://www.instagram.com/REPLACE_ME/",
  whatsappNumber: "",
  email: "hello@example.com",
  productInquiryCopy: {
    greeting: "Hello,",
    interestLine: "I'm interested in the {productName}.",
    colorLabel: "Color",
    materialLabel: "Material",
    productLabel: "Product",
  },
  // Add catalog and information routes only once those pages exist.
  primaryNavigation: [{ label: "Home", href: "/" }],
} as const;
