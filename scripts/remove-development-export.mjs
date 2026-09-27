import { existsSync, rmSync } from "node:fs";

const developmentExport = "out/dev";

if (existsSync(developmentExport)) {
  rmSync(developmentExport, { force: true, recursive: true });
}
