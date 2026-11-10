import { render, screen } from '@testing-library/react';

jest.mock('@/internationalization/catalogs', () => {
  const english = { 'media.play_video': 'Play video' };
  return {
    FALLBACK_LOCALE: 'en-us',
    getCatalog: (locale: string) => (locale === 'es' ? { 'media.play_video': 'Reproducir video' } : english),
  };
});

import VideoPlayButton from '@/mdx-components/Video/VideoPlayButton';

const ORIGINAL_BUILD_LOCALE = process.env.NEXT_PUBLIC_DOCS_LOCALE;

afterEach(() => {
  if (ORIGINAL_BUILD_LOCALE === undefined) {
    delete process.env.NEXT_PUBLIC_DOCS_LOCALE;
  } else {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = ORIGINAL_BUILD_LOCALE;
  }
});

describe('a migrated component', () => {
  it('renders English when no build locale is set', () => {
    delete process.env.NEXT_PUBLIC_DOCS_LOCALE;
    render(<VideoPlayButton />);
    expect(screen.getByRole('button', { name: 'Play video' })).toBeInTheDocument();
  });

  it('renders Spanish on a Spanish build', () => {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = 'es';
    render(<VideoPlayButton />);
    expect(screen.getByRole('button', { name: 'Reproducir video' })).toBeInTheDocument();
  });
});
