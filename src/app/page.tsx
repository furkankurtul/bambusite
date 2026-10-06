import { renderHome } from "@/components/pages/HomePage";
import { getPageMetadata } from "@/i18n/metadata";

export const metadata = getPageMetadata("tr", "home");
export default async function Home() {
  return renderHome("tr");
}
