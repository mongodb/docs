/**
 * Replaces HTML-reserved characters with safe equivalents when
 * dangerously setting inner HTML (e.g. for search previews).
 * See DOP-2863 for rationale.
 */
export const escapeHtml = (unsafe: string) => {
  if (!unsafe) return '';

  return unsafe
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
};
