import { renderHome } from "@/components/pages/HomePage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "3D Printed Products and Custom Prints",
  description:
    "Explore ready-to-print products or request a custom 3D print for your next idea.",
};
export default async function Home() {
  return renderHome("tr");
}
