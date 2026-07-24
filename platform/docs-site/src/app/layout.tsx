import type { Metadata } from 'next';
import './globals.css';
import '@/styles/mongodb-docs.css';
import '@/styles/global-dark-mode.css';
import '@/styles/icons.css';
import TrackJSProvider from '@/context/trackjs-provider';
import { getHtmlLangFormat } from '@/utils/locale';

export const metadata: Metadata = {
  title: 'MongoDB Docs',
  description: 'MongoDB Documentation',
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
