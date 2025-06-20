export function truncateEmbeddings(body: string): string {
  // Matches elements of an embedding vector string with at least two elements.
  // Each element must be between -1 and 1, include the leading 0 or -0, and
  // include at least one digit after the decimal point.
  // e.g. "0.123, 0.456, -0.789, ..."
  const embeddingRegex =
    /([-]?0\.\d+d?),\s*([-]?0\.\d+d?)(?:\s*,\s*[-]?0\.\d+d?)*/g;
  return body.replace(embeddingRegex, (...matches) => {
    const [_wholeEmbedding, firstFloat, secondFloat] = matches;
    return `${firstFloat}, ${secondFloat}, ...`;
  });
}
