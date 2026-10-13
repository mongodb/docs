export type ComponentKind = 'container' | 'opaque' | 'reference';

export interface ComponentRule {
  /**
   * container: recurse into children as blocks.
   * opaque:    do not recurse; only listed props are translatable.
   * reference: preserve verbatim; never translate, never recurse.
   */
  kind: ComponentKind;
  /** Prop names whose string values are translatable. */
  translatableProps: string[];
  /**
   * The prop whose value is the primary visible text for a self-closing
   * (childless) inline element. When set, the value is inlined into the
   * parent block's translatable string (as an attr-wrap) so the translator
   * sees it in context for gender/number agreement. It is NOT extracted as
   * a separate prop entry.
   */
  primaryTextProp?: string;
}

/** Unknown components: unwrap into children (like strip-custom-mdx), never translate props. */
export const DEFAULT_RULE: ComponentRule = { kind: 'container', translatableProps: [] };

/** Prop names that carry user-visible or audible (screen-reader) text on ANY component. */
export const GLOBAL_TRANSLATABLE_PROPS: ReadonlySet<string> = new Set([
  'title', 'caption', 'headline', 'alt', 'icon-alt', 'tooltip',
  'heading', 'subHeading', 'label', 'summary', 'placeholder', 'aria-label',
]);

/** True if the given attribute on the given component carries translatable text. */
export function isTranslatableProp(componentName: string, attrName: string): boolean {
  return GLOBAL_TRANSLATABLE_PROPS.has(attrName)
    || ruleFor(componentName).translatableProps.includes(attrName);
}

const container = (translatableProps: string[] = []): ComponentRule => ({
  kind: 'container',
  translatableProps,
});
const opaque = (translatableProps: string[] = []): ComponentRule => ({
  kind: 'opaque',
  translatableProps,
});
const reference = (primaryTextProp?: string): ComponentRule => ({
  kind: 'reference',
  translatableProps: [],
  primaryTextProp,
});

const REGISTRY: Record<string, ComponentRule> = {
  // --- Admonitions (transform-admonitions.ts) — container; `title` is
  // covered by the global visible-props set, so no per-component entry is
  // needed here. Banner is grounded by the test suite as admonition-styled
  // even though it is not present in transform-admonitions.ts's
  // ADMONITION_NAMES set today.
  Note: container(),
  Tip: container(),
  Important: container(),
  Warning: container(),
  Banner: container(),
  Example: container(),
  See: container(),
  Seealso: container(),
  Admonition: container(),

  // --- Procedures (transform-procedure.ts) ---
  // Step titles come from a <StepHeading> child (or a body heading), never
  // from a prop, so no translatableProps are needed here.
  Procedure: container(),
  Step: container(),
  StepHeading: container(),

  // --- Tabs (transform-tabs.ts): `name` becomes the visible H3 heading and
  // is translatable; `tabid` is the stable, non-translatable identifier used
  // for filtering and must never appear in translatableProps. ---
  Tabs: container(),
  Tab: container(['name']),

  // --- Tables (transform-table.ts) ---
  // Cell content is recursed into and serialized as inline markdown; there
  // are no translatable attributes on any of these elements.
  Table: container(),
  TableRow: container(),
  TableCell: container(),
  TableHead: container(),
  TableBody: container(),
  TableHeaderCell: container(),

  // --- Collapsible (transform-collapsible.ts) ---
  // The plugin reads `heading` and `subHeading` attributes (not `title`) and
  // emits them as real headings, then recurses into the element's children.
  // Both attributes are covered by the global visible-props set.
  Collapsible: container(),

  // --- Abbr (transform-abbr.ts) ---
  // The plugin reads a `tooltip` attribute (not `title`) and appends it as
  // "(expansion)" text after the element's own children. Treated as opaque
  // because the children are the abbreviation itself (e.g. "API"), which is
  // preserved verbatim rather than recursed into as translatable blocks.
  // `tooltip` is covered by the global visible-props set.
  Abbr: opaque(),

  // --- IoCodeBlock / Input / Output (transform-io-code-block.ts) ---
  // The plugin unwraps IoCodeBlock and splices each Input/Output child's own
  // children directly into the tree (adding an "Output:" label before Output
  // content) — i.e. it recurses into children rather than treating the
  // element as an opaque unit. No attributes are translatable.
  IoCodeBlock: container(),
  Input: container(),
  Output: container(),

  // --- VersionAdded (transform-version-directives.ts) ---
  // The plugin prepends a generated "New in version X" label built from the
  // (non-translatable) `version` attribute, then recurses into the element's
  // own children as the explanatory body text that follows the label.
  VersionAdded: container(),

  // --- Replacement (resolve-includes.ts) ---
  // <Replacement name="..."> children are captured and spliced in as
  // translatable substitution text wherever the matching <Reference
  // type="substitution"> appears in the included file, so its children must
  // be recursed into rather than treated as opaque.
  Replacement: container(),

  // --- Opaque (no translatable children) ---
  // transform-image.ts: `alt` is covered by the global visible-props set;
  // `src` is not translatable.
  Image: opaque(),

  // --- Include (resolve-includes.ts) ---
  // The `src` target is resolved at build time and is never translatable, but
  // an <Include> element's only children are the <Replacement> elements whose
  // bodies are spliced into the included file as visible text. Treating
  // Include as a container is what lets the extractor reach them; a reference
  // rule would stop the walk here and drop that text from the payload.
  Include: container(),

  // --- References (resolve-references.ts) ---
  // Reference: `title` is the primary visible text for a self-closing
  // <Reference title="X" />. Inlining it into the parent block string gives
  // the translator context for gender/number agreement (e.g. "consulte
  // <X>" in Spanish). Other reference components have no primary text prop.
  Reference: reference('title'),
  RefRole: reference(),
  RefTarget: reference(),
  Target: reference(),
};

/** The rule for a component, or the safe default for unregistered names. */
export function ruleFor(name: string): ComponentRule {
  return REGISTRY[name] ?? DEFAULT_RULE;
}
