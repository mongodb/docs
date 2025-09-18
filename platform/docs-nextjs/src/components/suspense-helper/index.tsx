'use client';

import { useEffect, useState, Suspense } from 'react';

interface SuspenseHelperProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

/* Helper to avoid React minified errors. Compiles fallback component into the static HTML pages. */
export const SuspenseHelper = ({ fallback, children }: SuspenseHelperProps) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render children during SSR to avoid hydration mismatches
  if (!isMounted) {
    return <>{fallback}</>;
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
};
