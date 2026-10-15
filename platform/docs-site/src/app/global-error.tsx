'use client';

import { useEffect } from 'react';
import { reportError } from '@/utils/trackjs';

export default function GlobalError({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    reportError(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <h1>Something went wrong on our end.</h1>
        <p>Try reloading the page.</p>
      </body>
    </html>
  );
}
