import { pageFormats, isPageFormat, pageFormat } from "./PageFormat";

describe("PageFormat", () => {
  it("provides a list of the canonical page formats", () => {
    expect(pageFormats).toContain("md");
    expect(pageFormats).toContain("txt");
    expect(pageFormats).toContain("javascript");
  });

  it("provides a type guard for canonical page formats", () => {
    expect(isPageFormat("md")).toBe(true);
    expect(isPageFormat("txt")).toBe(true);
    expect(isPageFormat("javascript")).toBe(true);
    expect(isPageFormat("<<NOT A REAL FILE TYPE>>")).toBe(false);
  });

  describe("pageFormat()", () => {
    it("validates canonical file formats", () => {
      expect(pageFormat("md")).toBe("md");
      expect(pageFormat("txt")).toBe("txt");
      expect(pageFormat("javascript")).toBe("javascript");
    });

    it("handles unknown file format as a txt file or a specified default format", () => {
      expect(pageFormat("<<NOT A REAL FILE TYPE>>")).toBe("txt");
      expect(pageFormat("<<NOT A REAL FILE TYPE>>", "md")).toBe("md");
    });

    it("converts synonyms to the canonical page type name", () => {
      expect(pageFormat("js")).toBe("javascript");
      expect(pageFormat("ts")).toBe("typescript");
      expect(pageFormat("sh")).toBe("shell");
    });
  });
});
