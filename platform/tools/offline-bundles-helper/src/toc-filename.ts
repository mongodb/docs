// filename format: <label>.versioned.<projectName>.ts (e.g., "development.versioned.docs.ts" → "docs")
export const getProjectNameFromFilename = (
  filename: string,
): string | undefined => {
  const match = filename.match(/\.versioned\.([^.]+)/);
  return match?.[1];
};
