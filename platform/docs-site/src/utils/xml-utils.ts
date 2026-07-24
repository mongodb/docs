/**
 * Escapes special XML characters to prevent XML injection
 * @param str The string to escape
 * @returns The escaped string safe for use in XML
 */
export function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Converts a date string to RFC 2822 format (required by RSS spec)
 * Supports both ISO 8601 format (e.g., "2025-09-17T14:01:31.391Z")
 * and date-only format (e.g., "2025-09-17")
 * @param dateString The date string to convert
 * @returns RFC 2822 formatted date string
 */
export function toRFC2822Date(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return new Date().toUTCString();
  }
  return date.toUTCString();
}
