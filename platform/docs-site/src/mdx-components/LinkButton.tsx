'use client';

import { useRef } from 'react';
import { LinkButton as ViaLinkButton, ButtonVariant } from '@via-ds/components/button';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';

export type LinkButtonProps = {
  uri: string;
  children: React.ReactNode;
};

// MDX map renders server-side (RSC); a handler can't be a prop here.
export const LinkButton = ({ uri, children }: LinkButtonProps) => {
  // PressEvent has no currentTarget; read the label from the anchor ref.
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <ViaLinkButton
      ref={linkRef}
      className="button"
      variant={ButtonVariant.Primary}
      href={uri}
      onPress={() => {
        const labelText = linkRef.current?.textContent?.trim() ?? '';
        reportAnalytics('CTA Click', {
          position: 'body',
          position_context: `button`,
          label: labelText,
          label_text_displayed: labelText,
          scroll_position: currentScrollPosition(),
          tagbook: 'true',
        });
      }}
    >
      {children}
    </ViaLinkButton>
  );
};
