import NotFound from '@/app/not-found';

export const metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Stable /docs/404/ URL for Netlify (and other) status=404 rewrites.
 * Replaces the former standalone docs-404 Netlify content app.
 */
export default function Docs404Page() {
  return <NotFound />;
}
