# Manifest Schema

A **manifest** is one YAML file per docset. It holds everything docset-specific so the skill's pipeline code stays generic. To onboard a new docset, write one manifest — no code changes.

This file is the **contract**: the fields a manifest may contain, their types, whether required, and which pipeline stage consumes each. `references/<docset>.yaml` is one filled-in instance (e.g. `references/pymongo.yaml`).

## Pipeline stages (for the "Consumed by" column)

0. **manifest setup** — for a docset with no manifest, scaffold one and confirm its per-docset considerations + exception idiom with the user before the first run.
1. **extract** — `snooty build` the docs, walk the rendered AST (includes resolved) to collect code blocks, advisory prose, and topic-page metadata. Then merge the universal guidelines and the manifest criteria into one criteria file, and split the content into batches for the scan.
2. **scan** — agent judges each extracted unit against universal + manifest criteria → candidate findings.
3. **classify** — agent classifies each candidate into exactly one of five labels.
4. **output** — write the report; draft held tickets for Confirmed findings only.

**Validation** is a post-pipeline spot-check pass (false-positive regression set, recall spot-check, stability check), not a numbered content-transformation stage. It consumes `validation.known_intentional`. Before adding or changing fixtures, read "Validation" in SKILL.md for how each run uses them.

---

## Fields

| Field | Type | Required | Consumed by | Meaning |
|---|---|---|---|---|
| `docset` | string | yes | all | Short docset id (e.g. `pymongo`). Used in report/ticket text and file naming. |
| `component` | string or list\<string\> | yes | classify, output | DOCSP Jira component(s) for the docset. Drafted tickets are tagged with all listed components; triage searches existing tickets by the docset-specific (first) one. Use a list when the convention pairs a docset-specific component with a parent (e.g. PyMongo uses `Pymongo / Arrow / Django` + `Drivers`). Verify from existing tickets rather than guessing. |
| `docs.path` | path | yes | extract | Snooty source root to build (dir containing `snooty.toml`). For versioned docsets, point at `content/<docset>/upcoming` (or `current` per the user). |
| `docs.surface_pages` | list<glob> | no | extract | Optional allowlist of pages/areas to scan. Omit to scan all built pages. Use to scope a noisy docset or to re-run a single section. |
| `disable_universal` | list<string> | no | extract | Universal guideline ids (e.g. `[U-7]`) left out of this docset's criteria; `scripts/resolve_criteria.py` omits them, so Stage 2 never sees them. Use when a guideline does not fit the docset. Add a one-line comment giving the reason. |
| `security_considerations[]` | list | yes (may be empty) | scan, classify | The per-docset security checklist. Each entry is the contract below. Holds only rules the universal guidelines don't cover; see "Universal guidelines (not per-docset)". It drives category #3 (absence) and refines #1/#2. |
| `security_considerations[].id` | string | yes | scan, classify | Stable kebab-case id (e.g. `connection-strings-must-use-tls`). Referenced by findings as the `guideline` field. |
| `security_considerations[].rule` | string | yes | scan | One-sentence statement of the rule (e.g. "Connection string examples must enable TLS, either via `mongodb+srv://` or an explicit `tls=true` parameter."). |
| `security_considerations[].applies_to` | list<string> | no | scan | Topic areas / heading substrings this consideration applies to (e.g. `["connect", "connection-string", "authentication"]`). Stage 2 only checks absence on pages whose headings match. Omit to apply universally across the docset. |
| `security_considerations[].category` | enum | yes | scan | Which finding category this consideration primarily drives: `counter_best_practice_advice`, `insecure_code_example`, or `absent_consideration`. A consideration may be checked in more than one category, but this declares its primary home. |
| `security_considerations[].severity` | enum | no | classify | Default severity if a finding for this consideration is Confirmed (High / Medium / Low). The classifier may override per finding. |
| `exception_markers[]` | list | no | classify | The docset's "intentional exception" idiom: signals that an insecure pattern is shown deliberately. A candidate carrying one → **Intentional** (or at minimum demoted out of Confirmed). |
| `exception_markers[].directive` | string | no | classify | The RST directive used for the caveat (e.g. `warning`, `important`, `note`). |
| `exception_markers[].phrases[]` | list<string> | no | classify | Substrings that, when found in a callout adjoining an insecure example, mark it intentional (e.g. `for demonstration purposes only`, `do not use in production`, `simplified for clarity`). Prefer a full caveat phrase over a single word such as `insecure`, which also appears in callouts that don't caveat anything. |
| `validation.known_intentional[]` | list | no | validation | The false-positive regression set. Each entry names a page + the insecure pattern + the caveat that makes it Intentional. A run must keep these at Intentional/Needs-eng, never Confirmed. Unlike docs-drift's answer key, this is not ground truth. |

---

## Defaults the skill applies (not per-docset)

These are **general detection principles**, kept in code/skill defaults and the universal guidelines, not in manifests, so they can't be overfit to one docset:

- **Resolve includes** — extraction always uses the rendered Snooty AST, so a code example defined in a shared include is attributed to the include file and never missed. An include used on several pages appears once per page; Stage 4 drafts one ticket for the repeats.
- **Placeholder ≠ leaked secret** — a connection-string example using `<password>`, `***`, `PASSWORD`, or an obviously non-real placeholder is **not** a leaked-secret finding. U-7 (how examples retrieve credentials) can still flag it, subject to its own exemptions.
- **Judgment calls defer** — advisory/code findings that rest on judgment (rather than a clear-cut signature violation) go to **Writer-confirm** when a writer can settle them from in-repo evidence, otherwise **Needs-eng-confirmation**; never auto-Confirmed.
- **Absence findings defer by default** — category #3 (`absent_consideration`) is the noisiest class. Reserve Confirmed for unambiguous, in-scope omissions; defer the rest.

## Universal guidelines (not per-docset)

The MongoDB-relevant security baseline common to all docsets lives in `references/universal-guidelines.yaml`, not in manifests. Manifests extend it with docset-specific considerations; they do not duplicate it. Stage 1 merges both into one criteria file, minus any guideline in `disable_universal`, and Stages 2 and 3 read that file.

The file holds one `guidelines` list. Each entry has these fields:

| Field | Type | Required | Meaning |
|---|---|---|---|
| `id` | string | yes | `U-<n>`. Findings cite it as their `guideline` field, and `disable_universal` lists it. |
| `name` | string | yes | Stable kebab-case name (e.g. `credentials-from-environment`). |
| `rule` | string | yes | The rule, as one or more sentences. |
| `scope` | string | no | The pages or connections the rule applies to. Omit to apply everywhere. |
| `exempt` | list\<string\> | no | Cases Stage 2 must not raise under this guideline. |
| `notes` | list\<string\> | no | Refinements to the rule, such as option names or a related pattern. Start each with a short label (e.g. `Builders:`). |
| `category` | list\<enum\> | yes | The finding categories the guideline drives, primary first. Same values as `security_considerations[].category`. |
| `grounding` | string | yes | The in-repo docs page that establishes the rule, with a quote. Use `general` for a universally accepted principle with no MongoDB-specific claim (e.g. least privilege); Stage 3 treats those as weaker signals. |

**What belongs in a manifest.** Add a `security_considerations` entry only when it covers an API, surface, or pattern that no universal guideline covers: for example, an ORM's raw-query method, a connector's configuration option, or a language-specific deserializer. Do not restate a universal guideline for the docset's own option names or pages. The universal guideline already applies to every page.

### Adding a universal guideline

A rule starts as a per-docset consideration. Promote it to a universal guideline when both of these are true:

- It appears, in substance, in the manifests of five or more docsets.
- It can be grounded in in-repo docs (cite the page and quote it), or it is a `general` principle.

To promote it, add an entry to `universal-guidelines.yaml` using the next unused `U-<n>`, then delete the per-docset copies. Keep any per-docset exemption the universal wording doesn't cover, or add `disable_universal` to docsets where the rule doesn't fit. Then run the fixture check (see "Validation" in SKILL.md) across every docset that has a manifest.

## Label decision order (classify)

For each finding, the first matching rule wins:

1. Candidate carries an `exception_markers` caveat adjoining the insecure content → **Intentional**. A phrase match is necessary but not sufficient: the callout must caveat this pattern (for example, a warning about TLS options for a TLS-disable example). A callout that contains the phrase but is about something else does not count. This includes the include-provenance case: tabbed code blocks have `inside_callout: None` because Snooty attributes them to the include file, but if the *page* carrying them has an `advisory` callout with an `exception_markers` phrase addressing the code's pattern, that counts as an adjoining caveat → **Intentional**. The caveat must be verified in the built AST (a `sharedinclude/...` provenance is valid); shared admonitions are pulled via `sharedinclude_root` and do NOT appear in a local `content/` grep, so never dismiss a callout as absent without checking the build.
2. The question is "is this a deliberate doc choice?" and it is answerable from in-repo evidence (compare sibling pages, check docset conventions) → **Writer-confirm**. This is the default home for judgment calls a writer can settle in minutes without an engineer (e.g. `connect.txt` omits TLS while sibling auth pages use `tls=True`).
3. The question requires a product/engineering judgment to settle (the pattern may be unavoidable for the API, the behavior may be correct-but-undocumented, the absence may reflect a real product constraint) → **Needs-eng-confirmation**.
4. Category is `absent_consideration` and the consideration's `applies_to` scope is fuzzy or the page only mentions the topic in passing → **Writer-confirm**.
5. Clear-cut violation of a named guideline (content demonstrably contradicts the rule, or an in-scope topic omits an unambiguous consideration) → **Confirmed**.
6. Real but minor, no ticket warranted unless requested → **Low-priority**.
