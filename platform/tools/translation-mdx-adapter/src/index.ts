/**
 * MDX Translation Adapter — public entry point.
 *
 * Usage:
 *   const content = extract(mdxSource);
 *   // caller: send content.payload + content.non_translatable_terms to the
 *   // translation service, then:
 *   const translatedMdx = reconstruct(serviceResponse.translations, content);
 *
 * `extract` and `reconstruct` must run in the same process: the content
 * object's manifest holds references into the retained in-memory AST.
 */
export { extract } from './extract.js';
export { reconstruct, validateTranslation, ReconstructionError } from './reconstruct.js';
export { translateMdx } from './translate-mdx.js';
export type {
  ContentObject,
  TranslationPayload,
  ManifestEntry,
  PlaceholderRecord,
} from './types.js';
export type { TranslateFn, TranslateMdxOptions } from './translate-mdx.js';
