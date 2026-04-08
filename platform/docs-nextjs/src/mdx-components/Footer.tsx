'use client';

import { UnifiedFooter } from '@mdb/consistent-nav';

export const Footer = () => {
  // TODO: language selector logic in unified footer
  return (
    <div className="footer-container" style={{ gridArea: 'footer' }}>
      <UnifiedFooter />
    </div>
  );
};
