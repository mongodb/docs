import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New in MongoDB | MongoDB',
  description:
    'Check out the latest updates in MongoDB – including improvements to the developer experience, expanded workload support, app modernization tools, and more.',
};

export default function ProductUpdatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
