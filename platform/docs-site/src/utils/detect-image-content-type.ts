const mimeByExtension: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

// Bytes to read when checking for an XML/SVG text header.
const TEXT_HEADER_BYTES = 256;

// UTF-8 byte order mark, sometimes prefixed to SVG/XML files.
const BOM = '\uFEFF';

/**
 * Resolve an image's Content-Type from its actual bytes, falling back to the
 * file extension when the bytes are unrecognized.
 *
 * Some source images in the docs are saved with the wrong extension — most
 * commonly SVGs named `.png` (41 such files across the content corpus at time
 * of writing). Trusting the extension sends a Content-Type the browser can't
 * decode (e.g. SVG bytes labeled `image/png`), so the image fails to render.
 * Sniffing the leading "magic bytes" — the same approach used by browsers and
 * the `file` utility — serves the correct type regardless of the extension.
 */
export const detectImageContentType = (bytes: Uint8Array, extension: string): string => {
  if (bytes.length >= 4) {
    // PNG: 89 50 4E 47
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'image/png';
    // JPEG: FF D8 FF
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
    // GIF: 47 49 46 ("GIF")
    if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return 'image/gif';
    // WEBP: "RIFF" (0–3) .... "WEBP" (8–11)
    if (
      bytes.length >= 12 &&
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    )
      return 'image/webp';
  }

  // SVG is XML text rather than binary, so it has no fixed magic number. Check
  // the leading bytes (after an optional UTF-8 BOM / whitespace) for an XML
  // prolog or an <svg> element.
  const head = Buffer.from(bytes.subarray(0, TEXT_HEADER_BYTES)).toString('utf8');
  const trimmedHead = (head.startsWith(BOM) ? head.slice(BOM.length) : head).trimStart();
  if (trimmedHead.startsWith('<?xml') || trimmedHead.includes('<svg')) return 'image/svg+xml';

  return mimeByExtension[extension.toLowerCase()] ?? 'application/octet-stream';
};
