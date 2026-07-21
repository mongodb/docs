import html2canvas from 'html2canvas';
import { isBrowser } from '@/utils/is-browser';

export async function retrieveDataUri(element: Element | null): Promise<string> {
  if (!isBrowser || !element) return '';
  const canvas = await html2canvas(element as HTMLElement, {
    useCORS: true,
    allowTaint: false,
    logging: false,
    scale: window.devicePixelRatio || 1,
  });
  return canvas.toDataURL('image/png');
}
