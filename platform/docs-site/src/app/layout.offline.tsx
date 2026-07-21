import './globals.css';
import '@/styles/mongodb-docs.css';
import '@/styles/global-dark-mode.css';
import '@/styles/icons.css';

export const metadata = {
  title: 'MongoDB Docs',
  description: 'MongoDB Documentation',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayoutOffline({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
