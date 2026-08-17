/** Branch this bundle was built from, from Netlify's `BRANCH`. */
export const BUILD_BRANCH = process.env.NEXT_PUBLIC_BUILD_BRANCH || 'unknown';

/**
 * Commit this bundle was built from. This, not the branch, is what makes an
 * individual merge attributable: Netlify reports every production build as the
 * production branch.
 */
export const BUILD_COMMIT = process.env.NEXT_PUBLIC_BUILD_COMMIT || 'unknown';

/**
 * Docset this deploy was built for: `manual`, `landing`, `atlas`, … Needed
 * alongside the URL prefix because manual and landing both deploy at `/docs`.
 */
export const BUILD_DOCS_PROJECT = process.env.NEXT_PUBLIC_BUILD_DOCS_PROJECT || 'unknown';

/**
 * Whether this is the inactive/EOL manual deploy (v4.4/v5.0/v6.0). It shares
 * both `/docs` and `DOCS_PROJECT=manual` with active manual, so without this
 * flag its traffic drags active manual's baseline toward EOL pages.
 */
export const BUILD_INACTIVE_MANUAL = process.env.NEXT_PUBLIC_INACTIVE_MANUAL === 'true';
