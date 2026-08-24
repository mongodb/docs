import type { Metadata } from 'next';
import './globals.css';
import '@/styles/mongodb-docs.css';
import '@/styles/global-dark-mode.css';
import '@/styles/icons.css';
import TrackJSProvider from '@/context/trackjs-provider';
import { getHtmlLangFormat } from '@/utils/locale';
import { getAssetBucketSuffix, getBasePath } from '@/utils/base-path';

// Deliberately not the `app/favicon.ico` file convention: Next builds that
// convention's href from basePath, not assetPrefix, so manual — basePath `/docs`,
// shared with landing — emitted `/docs/favicon.ico`, which b2k routes to neither
// deploy (manual is reachable only via MANUAL_SLUGS plus its
// `/docs/docs_static_manual/_next/*` asset bucket). Explicit metadata URLs are
// passed through verbatim, so this spells out the same bucket-aware
// `_next/static` path that content images already use. The file is copied there
// by scripts/copy-images-to-next-static.ts (postbuild).
const FAVICON_HREF = `${getBasePath()}${getAssetBucketSuffix()}/_next/static/images/favicon.ico`;

export const metadata: Metadata = {
  title: 'MongoDB Docs',
  description: 'MongoDB Documentation',
  icons: { icon: FAVICON_HREF },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={getHtmlLangFormat('en-us')} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TrackJSProvider />
        {children}
      </body>
    </html>
  );
}
