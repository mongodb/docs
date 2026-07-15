---
description: Migrate a docs component from rST/Snooty AST to MDX. Usage: /migrate-component <component-name>
---

You are helping an engineer migrate the **$ARGUMENTS** component from the rST/Snooty AST rendering system to MDX. This spans two packages. Work through the three phases below. At every **CHECKPOINT**, stop, summarize your findings or changes, and explicitly ask the engineer to confirm before continuing.

---

## Project Context

**Converter package** — `platform/snooty-ast-to-mdx/`

Controls how Snooty RST AST nodes are serialized to MDX JSX output.

- Main dispatcher: `src/core/convertSnootyAstToMdast/convertSnootyAstToMdast.ts`
- Modular handlers for complex directives: `src/core/convertSnootyAstToMdast/` (e.g., `convertDirectiveImage.ts`)
- Snapshot tests: `test/convertSnootyAstToMdast.snap.test.ts`
- Granular unit tests: `test/convertSnootyAstToMdast.test.ts`
- Test commands: `pnpm test` | `pnpm test:update` (update snapshots)

**Component package** — `platform/docs-nextjs/`

- RST components (source): `src/components/$ARGUMENTS/`
- MDX components (destination): `src/mdx-components/`
- MDX component registry: `src/mdx-components.tsx`
- RST component tests: `src/tests/unit/$ARGUMENTS.test.tsx` + `src/tests/unit/__snapshots__/$ARGUMENTS.test.tsx.snap`
- MDX component tests: `src/tests/mdx/$ARGUMENTS.test.tsx` + `src/tests/mdx/__snapshots__/$ARGUMENTS.test.tsx.snap`
- Test commands: `pnpm test` | `pnpm test:update`

---

## Phase 1 — Validate & understand

**1a. Confirm this is a migratable component**

Before doing any other work, verify that `$ARGUMENTS` is actually a React component that warrants migration.

Check for all of the following:
1. A source component exists at `platform/docs-nextjs/src/components/$ARGUMENTS/`
2. The converter in `convertSnootyAstToMdast.ts` has a handler (or could reasonably have one) that emits a JSX tag for this component
3. The name refers to something that produces rendered output — not a metadata directive, configuration block, include, or structural marker

**If any of these checks fail**, stop immediately and notify the engineer:

> "I couldn't confirm that `$ARGUMENTS` is a migratable React component. Here's what I found: [describe what exists and what's missing]. This might be [an include / a metadata directive / a configuration node / something already handled as a stub]. Can you provide more context about what you're trying to migrate?"

Do not proceed until the engineer clarifies.

**1b. Read the RST component**

Read `platform/docs-nextjs/src/components/$ARGUMENTS/`. Identify:
- Which Snooty AST node type(s) and/or directive names map to this component
- The full props interface (`nodeChildren`, `options`, `argument`, sub-components, etc.)
- Any logic, state, context, or event handlers that must be preserved in the MDX version
- Sub-components that may also need migrating (e.g., `<Tab>` inside `<Tabs>`)

**1c. Analyze the converter**

Search `convertSnootyAstToMdast.ts` for the directive name or node type. Determine:
- Does a handler exist? Does it produce the right JSX attributes?
- Are there edge cases not covered (optional attrs, numeric coercion, missing arguments, sub-components)?
- Does the handler correctly pass children?

**CHECKPOINT 1** — Present:
- The RST component's current props interface
- Current converter behavior for this node type
- The proposed MDX JSX output format (e.g., `<Admonition name="note" title="...">children</Admonition>`)
- A clear list of converter changes needed (if any) and why

Wait for engineer confirmation before continuing.

---

## Phase 2 — Update the converter

**2a. Write tests first**

Before modifying the converter, add test cases that specify the expected behavior:
- Add granular assertions to `test/convertSnootyAstToMdast.test.ts` following the `describe/it` pattern in that file
- For broad snapshot coverage, add cases to `test/convertSnootyAstToMdast.snap.test.ts`
- Cover: happy path, edge cases, sub-components if applicable

These tests should fail at this point — they define the target behavior before implementation.

**2b. Implement converter changes**

Modify `convertSnootyAstToMdast.ts` to match the agreed JSX output. If the logic is complex, extract it into a dedicated handler file in `src/core/convertSnootyAstToMdast/` following the pattern of existing handlers like `convertDirectiveImage.ts`.

**2c. Run converter tests**

```bash
cd platform/snooty-ast-to-mdx && pnpm test
```

If snapshots need regenerating after a deliberate output change: `pnpm test:update`. Fix any unexpected failures before proceeding.

**CHECKPOINT 2** — Show:
- The new test cases
- A diff of converter changes
- Passing test output

Wait for engineer confirmation before continuing.

---

## Phase 3 — Create the MDX component and tests

**3a. Copy and adapt the component**

1. Copy the RST component from `platform/docs-nextjs/src/components/$ARGUMENTS/` to `platform/docs-nextjs/src/mdx-components/`. Maintain directory structure for multi-file components.

2. Adapt the props interface to match the JSX attributes the converter now emits:
   - `nodeChildren: SomeNode['children']` → `children: React.ReactNode`
   - Nested `options` objects → flat named props (string, boolean, number) matching the converter output
   - `ComponentFactory` child rendering → `{children}` directly
   - Remove AST-specific imports (`ComponentFactory`, node types used only for prop shapes)

3. Preserve everything else without modification: all logic, state, context usage, event handlers, analytics, and styling.

**Handling code that cannot translate to MDX props**

Some RST component logic depends on AST node data that has no clean equivalent as a React prop — for example, runtime AST traversal, node-type-specific branching, or data only available in the Snooty parse context.

When you encounter this:
- **Do not delete the code.** Comment it out and leave a clear `// TODO(mdx-migration):` comment explaining what the code was doing and why it cannot be directly translated.
- Stop and surface this to the engineer before proceeding. Present:
  - What the commented-out code was doing and what behavior will be lost
  - Concrete options for how it could be resolved (e.g., "this could be passed as an additional prop from the converter", "this might need to be pre-computed and injected via frontmatter", "this behavior may already be handled elsewhere in the MDX pipeline")
- Ask the engineer how to proceed. Do not make a unilateral decision on untranslatable logic.

**3b. Register the component in the MDX registry**

Open `platform/docs-nextjs/src/mdx-components.tsx` and update it for the newly added component:

1. **Add the import** at the top of the file alongside other mdx-component imports.

2. **Find the existing mapping** for this component's JSX tag name (the PascalCase name the converter emits). It may already exist as a stub like `<span>{children}</span>` or `() => null`.

3. **Replace the stub** (or add a new entry if missing) with the real component, following the patterns already present in the file. The JSX tag name in the mapping must exactly match what the converter emits.

4. If this component has sub-components (e.g., `Tab` inside `Tabs`), register those as well.

**3c. Write the MDX component test and copy the snapshot**

The goal is to validate that the new MDX component renders identically to the RST component it replaced.

1. **Copy the snapshot file as-is** from `src/tests/unit/__snapshots__/$ARGUMENTS.test.tsx.snap` to `src/tests/mdx/__snapshots__/$ARGUMENTS.test.tsx.snap`. Do not modify it.

2. **Write the MDX test** at `src/tests/mdx/$ARGUMENTS.test.tsx`. Use the RST unit test at `src/tests/unit/$ARGUMENTS.test.tsx` as a reference for test names and assertion structure, but adapt it to the MDX component:
   - Keep the same test name/description as the unit test (snapshot keys must match)
   - Use the same assertion pattern (`expect(tree.asFragment()).toMatchSnapshot()`)
   - Use inline JSX children and flat props — do NOT import JSON mock data files
   - Add any mocks required by the component (check other MDX tests in `src/tests/mdx/` for examples)

**3d. Run MDX component tests**

```bash
cd platform/docs-nextjs && pnpm test -- --testPathPattern="src/tests/mdx/$ARGUMENTS"
```

Jest will compare the rendered output against the copied snapshot. A passing test means the MDX component renders identically to the original RST component.

**If tests fail**, do not attempt to fix them unilaterally. Stop and notify the engineer:

> "The MDX component snapshot does not match the original. Here's what differs: [describe the diff]. This could mean the prop interface change affected rendering, or there's a bug in the migration. How would you like to proceed — resolve the diff, update the snapshot to accept the new output, or skip for now?"

Wait for the engineer's direction before continuing.

**CHECKPOINT 3 (final)** — Show:
- A diff of the new MDX component vs the RST original, with each prop change explained
- Any `TODO(mdx-migration)` comments left in the component that still need resolution (if any remain)
- The updated `mdx-components.tsx` mapping entry
- The new test file and snapshot
- Test output (passing or, if failing, the diff and engineer's decision on how to proceed)

Confirm with the engineer that the migration is complete.
