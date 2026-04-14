import fs from "fs";
import path from "path";

export function loadWritingMarkdown(filename: string): string {
  const full = path.join(process.cwd(), "content", "writing", filename);
  return fs.readFileSync(full, "utf8");
}
