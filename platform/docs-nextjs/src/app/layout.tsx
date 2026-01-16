import type { Metadata } from 'next';
import './globals.css';
import '@/styles/mongodb-docs.css';
import '@/styles/global-dark-mode.css';
import '@/styles/icons.css';
import TrackJSProvider from '@/components/trackjs-provider';

export const metadata: Metadata = {
  title: 'MongoDB Docs',
  description: 'MongoDB Documentation',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: Locale - I believe we need to make sure the lang property is set to the correct locale
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TrackJSProvider />
        {children}
      </body>
    </html>
  );
}
