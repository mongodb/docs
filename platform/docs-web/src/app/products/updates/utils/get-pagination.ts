/**
 *
 * @param array - flatten array
 * @param chunkSize - max size of each array
 * @returns [[{}, {}], [{}]]
 * @description Takes an flatten array and creates one level nested array of objects based on the chunkSize. Used for pagination data.
 */
export const getPagination = <T>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  if (!array.length) {
    return [[]]; // default to one empty nested array
  }
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};
