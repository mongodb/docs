/**
 * Pre-process table rows in the source string before parsing.
 * This handles HTML entity newlines and whitespace normalization in table rows
 * to prevent them from breaking table formatting during parsing.
 */
export function preprocessTableRows() {
  return (source: string): string => {
    // Match table rows (lines that start with | and contain |)
    return source.replace(/^(\|[^\n]*)/gm, (match) => {
      return match
        .replace(/&#xA;/g, " ") // Replace HTML entity newlines
        .replace(/&#x0A;/g, " ") // Replace hex entity with space
        .replace(/&#10;/g, " ") // Replace decimal entity with space
        .replace(/\.([A-Z])/g, ". $1") // Add space after period before capital letter
        .replace(/\s+/g, " ") // Collapse multiple spaces to one
        .replace(/\s+\|$/, " |") // Trim trailing spaces before final pipe, keep one space
        .trimEnd(); // Remove any remaining trailing whitespace
    });
  };
}
