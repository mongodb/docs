import { cache as reactCache } from 'react';

// React.cache is only available in Next.js RSC builds; fall back to identity
// in other environments (e.g. Jest) where it is not defined.
export const cache = typeof reactCache === 'function' ? reactCache : <T>(fn: T): T => fn;
