/**
  This is the definition of the canonical file formats that we support
  for pages. If something is not in this list, we treat it as a "txt"
  file.

  If a format may be referenced by multiple terms (e.g. a file
  extension), we list it as an array where the first element is the
  canonical name and the rest are synonyms.
 */
const pageFormatsWithSynonyms = [
  // Text file formats
  ["txt", "text"],
  ["md", "markdown"],
  "mdx",
  ["restructuredtext", "rst"],
  // Data file formats
  "csv",
  "json",
  ["yaml", "yml"],
  "toml",
  "xml",
  "openapi-yaml",
  "openapi-json",
  "graphql",
  // Code file formats
  ["c", "h"],
  ["cpp", "hpp", "cxx", "hxx"],
  ["csharp", "cs"],
  ["go", "golang"],
  "html",
  "java",
  ["javascript", "js", "cjs", "mjs"],
  ["kotlin", "kt"],
  ["latex", "tex"],
  ["objective-c", "m"],
  "php",
  ["python", "py"],
  ["ruby", "rb"],
  ["rust", "rs"],
  ["scala", "sc"],
  ["shell", "sh"],
  "swift",
  ["typescript", "ts"],
] as const;

/**
  The list of canonical file formats that we support for pages.
 */
export const pageFormats = pageFormatsWithSynonyms.map((type) =>
  typeof type === "string" ? type : type[0]
);

// Helper that makes every element of pageFormatsWithSynonyms a tuple.
// We define this outside of the function because it's derived from a
// const so does not need to be redefined every time the function is
// called.
const pageFormatsAndSynonymsAsTuples = pageFormatsWithSynonyms.map((t) =>
  typeof t === "string" ? ([t] as const) : t
);

/**
  Maps a string to the canonical page format it represents.

  @returns The canonical page format, or undefined if the string is not
  a recognized page format.
 */
export const asPageFormat = (str: string): PageFormat | undefined => {
  for (const pageFormatAndSynonyms of pageFormatsAndSynonymsAsTuples) {
    if ((pageFormatAndSynonyms as readonly string[]).includes(str)) {
      return pageFormatAndSynonyms[0];
    }
  }
};

/**
  A canonical page format.
 */
export type PageFormat = (typeof pageFormats)[number];

/**
  Type guard to check if a string is a canonical page format.
 */
export function isPageFormat(str: string): str is PageFormat {
  return pageFormats.includes(str as PageFormat);
}

/**
  Converts a string to a canonical page format. If the string is not a
  recognized page format or a synonym for one, this returns a default
  page format.
 */
export function pageFormat(
  str: string,
  defaultPageFormat: PageFormat = "txt"
): PageFormat {
  return asPageFormat(str) ?? defaultPageFormat;
}
