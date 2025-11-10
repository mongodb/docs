import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MongoDB AI Assistant | MongoDB',
  description: 'Your AI-powered MongoDB assistant to give expert guidance and recommendations for all things MongoDB.',
};

export default function AssistantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
