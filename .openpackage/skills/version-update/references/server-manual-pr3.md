# Server Manual PR 3 Reference

Load this file before beginning PR 3.

---

## snooty.toml Constants

Update the following constants in the `[constants]` block of
`content/manual/upcoming/snooty.toml`. (The `[substitutions]` block
higher up in the same file has its own `version` / `version-last` keys
that resolve to `{+version+}` / `{+version-last+}` — do not edit those.)

| Constant | New value |
|----------|-----------|
| `version` | `{NEXT}` |
| `version-dev` | `{NEXT}` |
| `release` | `{NEXT}.0` |
| `current-minor-release` | **[minor]**: Update to `{RELEASING}`. **[major/LTS]**: Leave unchanged — it should continue to point to the most recent minor release in the previous series. |
| `pgp-version` | `{NEXT}` |
| `version-last` | Previous LTS version (e.g. `9.0`); update only when a new LTS GAs |
| `latest-lts-version` | Update only if `{NEXT}` is a new LTS line |
| `last-supported-version` | Update per release policy |
| `minimum-lts-version` | Update alongside `last-supported-version` when an LTS version goes out of support — confirm with release policy |

Do not change any constant whose new value cannot be confirmed from
the existing file or from user input. List unconfirmed constants and
ask the user before proceeding.

---

## ToC: `manual.ts`

Update `content/table-of-contents/version-arrays/server-docs/manual.ts`:

1. Append `v{NEXT}` to the end of the `allVersions` array (the array
   is ordered oldest → newest).
2. Update the `namedVersions` map:
   - Change the `'manual'` entry from `v{OUTGOING}` to `v{RELEASING}`.
   - Change the `'upcoming'` entry from `v{RELEASING}` to `v{NEXT}`.
3. If `v{OUTGOING}` (or any older version) is going EOL with this
   flip, add it to `deprecatedVersions`. Confirm the EOL list with the
   release policy before changing.

Example, flipping from 8.3 → 9.0 (RELEASING = 9.0, NEXT = 9.1):

Before:
```ts
const allVersions = ['v6.0', 'v7.0', 'v8.0', 'v8.1', 'v8.2', 'v8.3', 'v9.0'];
const namedVersions = new Map<string, string>([
  ['v8.3', 'manual'],
  ['v9.0', 'upcoming'],
]);
```

After:
```ts
const allVersions = ['v6.0', 'v7.0', 'v8.0', 'v8.1', 'v8.2', 'v8.3', 'v9.0', 'v9.1'];
const namedVersions = new Map<string, string>([
  ['v9.0', 'manual'],
  ['v9.1', 'upcoming'],
]);
```

---

## ToC: `release-notes.ts`

Update `content/table-of-contents/L2-data/release-notes.ts`:

1. In the `{RELEASING} (Upcoming)` collapsible (the one scoped
   `versions: { includes: ['upcoming'] }`): change the label to
   `{NEXT} (Upcoming)` and repoint its three URLs from
   `{RELEASING}`, `{RELEASING}-compatibility`, `{RELEASING}-changelog`
   to `{NEXT}`, `{NEXT}-compatibility`, `{NEXT}-changelog`.
2. Insert a new sibling collapsible directly below it:
   - Label: `{RELEASING} (Stable Release)`
   - `versions: { excludes: manualVersions.before('v{RELEASING}') }`
   - URLs: `release-notes/{RELEASING}`, `{RELEASING}-compatibility`,
     `{RELEASING}-changelog`
3. Change the existing `{OUTGOING} (Stable Release)` label to
   `{OUTGOING}` (leave its `versions` and children unchanged).

After editing both ToC files, run:

```bash
cd content/table-of-contents && pnpm tsc --noEmit
```
