import { detectImageContentType } from '@/utils/detect-image-content-type';

const bytesFrom = (...values: number[]) => Uint8Array.from(values);
const utf8 = (text: string) => Buffer.from(text, 'utf8');

describe('detectImageContentType', () => {
  it('detects PNG from its signature', () => {
    expect(detectImageContentType(bytesFrom(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a), '.png')).toBe('image/png');
  });

  it('detects JPEG from its signature', () => {
    expect(detectImageContentType(bytesFrom(0xff, 0xd8, 0xff, 0xe0), '.jpg')).toBe('image/jpeg');
  });

  it('detects GIF from its signature', () => {
    expect(detectImageContentType(utf8('GIF89a'), '.gif')).toBe('image/gif');
  });

  it('detects WEBP from the RIFF/WEBP signature', () => {
    const riff = utf8('RIFF');
    const webp = utf8('WEBP');
    const buf = new Uint8Array(12);
    buf.set(riff, 0);
    buf.set(webp, 8);
    expect(detectImageContentType(buf, '.webp')).toBe('image/webp');
  });

  it('detects SVG from an XML prolog', () => {
    expect(detectImageContentType(utf8('<?xml version="1.0"?>\n<svg></svg>'), '.svg')).toBe('image/svg+xml');
  });

  it('detects SVG from a bare <svg> root element', () => {
    expect(detectImageContentType(utf8('<svg xmlns="http://www.w3.org/2000/svg"></svg>'), '.svg')).toBe(
      'image/svg+xml',
    );
  });

  it('detects SVG even after a leading UTF-8 BOM', () => {
    expect(detectImageContentType(utf8('﻿<?xml version="1.0"?><svg></svg>'), '.svg')).toBe('image/svg+xml');
  });

  it('ignores the extension when the bytes say otherwise (SVG misnamed as .png)', () => {
    expect(detectImageContentType(utf8('<?xml version="1.0"?>\n<svg></svg>'), '.png')).toBe('image/svg+xml');
  });

  it('falls back to the extension when bytes are unrecognized', () => {
    expect(detectImageContentType(bytesFrom(0x00, 0x01, 0x02, 0x03), '.png')).toBe('image/png');
    expect(detectImageContentType(bytesFrom(0x00, 0x01, 0x02, 0x03), '.jpeg')).toBe('image/jpeg');
  });

  it('falls back to octet-stream for an unknown extension and unrecognized bytes', () => {
    expect(detectImageContentType(bytesFrom(0x00, 0x01, 0x02, 0x03), '.bin')).toBe('application/octet-stream');
  });
});
