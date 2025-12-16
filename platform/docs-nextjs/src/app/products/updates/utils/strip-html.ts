/**
 * Strips HTML tags from a string and decodes HTML entities, useful for search and truncation
 */
export function stripHtml(html: string): string {
  // First, remove all HTML tags
  let text = html.replace(/<[^>]*>/g, '');

  // Decode HTML entities
  // Use a more comprehensive approach that works in both browser and Node.js
  if (typeof document !== 'undefined') {
    // Browser environment: use DOM to decode all entities
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    text = textarea.value;
  } else {
    // Server-side: decode common entities including numeric ones
    // Handle numeric entities like &#160; (non-breaking space), &#39; (apostrophe), etc.
    text = text.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
    // Handle hex entities like &#x20; (space)
    text = text.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
    // Handle named entities
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'");
  }

  // Clean up multiple spaces that might result from decoded entities
  text = text.replace(/\s+/g, ' ');

  return text.trim();
}
