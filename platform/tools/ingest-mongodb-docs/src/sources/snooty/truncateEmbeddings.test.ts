import { truncateEmbeddings } from "./truncateEmbeddings";
import fs from "fs";
import path from "path";

const SRC_ROOT = path.resolve(__dirname, "..", "..");
const pageWithEmbeddings = fs.readFileSync(
  path.resolve(SRC_ROOT, "../testData/pageWithEmbeddings.md"),
  {
    encoding: "utf-8",
  }
);

describe("truncateEmbeddings", () => {
  it("should truncate embeddings (simple example)", async () => {
    const simple =
      "0.25, 0.5, 0.75, 0.1, 0.1, 0.8, 0.2, 0.6, 0.6, 0.4, 0.9, 0.3, 0.2, 0.7, 0.5, 0.8, 0.1, 0.8, 0.2, 0.6";
    const cleaned = truncateEmbeddings(simple);
    expect(cleaned).toBe("0.25, 0.5, ...");
  });
  it("should truncate embeddings (real page)", async () => {
    const cleaned = truncateEmbeddings(pageWithEmbeddings);
    // for the example text, should be 16 matches for 16 replacements
    const matches = cleaned.match(/, \.\.\./g);
    expect(matches?.length).toBe(16);
    expect(cleaned.length).toBeLessThan(pageWithEmbeddings.length);
  });
  it("should not truncate numbers with decimals", async () => {
    const test = "10.10.10.10/255.255.255.0";
    const cleaned = truncateEmbeddings(test);
    expect(cleaned).toBe(test);
  });
});
