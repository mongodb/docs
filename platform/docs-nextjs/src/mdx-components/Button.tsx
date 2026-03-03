'use client';

import LeafyButton, { Variant } from '@leafygreen-ui/button';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';

export type ButtonProps = {
  uri: string;
  children: React.ReactNode;
};

const Button = ({ uri, children }: ButtonProps) => {
  return (
    <LeafyButton
      className="button"
      variant={Variant.Primary}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        const labelText = event.currentTarget.textContent?.trim() ?? '';
        reportAnalytics('CTA Click', {
          position: 'body',
          position_context: `button`,
          label: labelText,
          label_text_displayed: labelText,
          scroll_position: currentScrollPosition(),
          tagbook: 'true',
        });
      }}
      href={uri}
    >
      {children}
    </LeafyButton>
  );
};

export default Button;
