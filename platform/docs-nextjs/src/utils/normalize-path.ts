// Remove duplicate slashes in path string
export const normalizePath = (path: string) => path.replace(/\/+/g, `/`);
