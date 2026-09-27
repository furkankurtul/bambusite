import "server-only";

import { access } from "node:fs/promises";
import path from "node:path";

export async function resolvePublicAsset(
  publicPath: string,
): Promise<string | undefined> {
  if (!publicPath.startsWith("/") || publicPath.includes(".."))
    return undefined;

  const filePath = path.join(process.cwd(), "public", publicPath.slice(1));

  try {
    await access(filePath);
    return publicPath;
  } catch {
    return undefined;
  }
}
