# Manifest Schema

A **manifest** is one YAML file per docset. It holds everything docset-specific so the skill's pipeline code stays generic. To onboard a new docset, write one manifest — no code changes.

This file is the **contract**: the fields a manifest may contain, their types, whether required, and which pipeline stage consumes each. `references/<docset>.yaml` is one filled-in instance (e.g. `references/pymongo.yaml`).

## Pipeline stages (for the "Consumed by" column)

0. **manifest setup** — for a docset with no manifest, scaffold one and confirm its per-docset considerations + exception idiom with the user before the first run.
1. **extract** — `snooty build` the docs, walk the rendered AST (includes resolved) to collect code blocks, advisory prose, and topic-page metadata.
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
| `security_considerations[]` | list | yes | scan, classify | The per-docset security checklist. Each entry is the contract below. This is the main per-docset knowledge; it drives category #3 (absence) and refines #1/#2. |
| `security_considerations[].id` | string | yes | scan, classify | Stable kebab-case id (e.g. `connection-strings-must-use-tls`). Referenced by findings as the `guideline` field. |
| `security_considerations[].rule` | string | yes | scan | One-sentence statement of the rule (e.g. "Connection string examples must enable TLS, either via `mongodb+srv://` or an explicit `tls=true` parameter."). |
| `security_considerations[].applies_to` | list<string> | no | scan | Topic areas / heading substrings this consideration applies to (e.g. `["connect", "connection-string", "authentication"]`). Stage 2 only checks absence on pages whose headings match. Omit to apply universally across the docset. |
| `security_considerations[].category` | enum | yes | scan | Which finding category this consideration primarily drives: `counter_best_practice_advice`, `insecure_code_example`, or `absent_consideration`. A consideration may be checked in more than one category, but this declares its primary home. |
| `security_considerations[].severity` | enum | no | classify | Default severity if a finding for this consideration is Confirmed (High / Medium / Low). The classifier may override per finding. |
| `exception_markers[]` | list | no | classify | The docset's "intentional exception" idiom: signals that an insecure pattern is shown deliberately. A candidate carrying one → **Intentional** (or at minimum demoted out of Confirmed). |
| `exception_markers[].directive` | string | no | classify | The RST directive used for the caveat (e.g. `warning`, `important`, `note`). |
| `exception_markers[].phrases[]` | list<string> | no | classify | Substrings that, when found in a callout adjoining an insecure example, mark it intentional (e.g. `for demonstration purposes only`, `do not use in production`, `simplified for clarity`). |
| `validation.known_intentional[]` | list | no | validation | The false-positive regression set. Each entry names a page + the insecure pattern + the caveat that makes it Intentional. A run must keep these at Intentional/Needs-eng, never Confirmed. Unlike docs-drift's answer key, this is not ground truth. |

---

## Defaults the skill applies (not per-docset)

These are **general detection principles**, kept in code/skill defaults and the universal guidelines, not in manifests, so they can't be overfit to one docset:

- **Resolve includes** — extraction always uses the rendered Snooty AST, so a code example defined in a shared include is extracted once with true provenance and never double-counted or missed.
- **Placeholder ≠ leaked secret** — a connection-string example using `<password>`, `***`, `PASSWORD`, or an obviously non-real placeholder is **not** a leaked-secret finding. A manifest consideration about how examples retrieve credentials (for example `pymongo-credentials-from-env-not-hardcoded`) can still flag it, subject to that consideration's own exemptions.
- **Judgment calls defer** — advisory/code findings that rest on judgment (rather than a clear-cut signature violation) go to **Writer-confirm** when a writer can settle them from in-repo evidence, otherwise **Needs-eng-confirmation**; never auto-Confirmed.
- **Absence findings defer by default** — category #3 (`absent_consideration`) is the noisiest class. Reserve Confirmed for unambiguous, in-scope omissions; defer the rest.

## Universal guidelines (not per-docset)

The MongoDB-relevant security baseline common to all docsets lives in `references/universal-guidelines.md`, not in manifests. Manifests extend it with docset-specific considerations; they do not duplicate it. Stage 2 always checks against both.

## Label decision order (classify)

For each finding, the first matching rule wins:

1. Candidate carries an `exception_markers` caveat adjoining the insecure content → **Intentional**. This includes the include-provenance case: tabbed code blocks have `inside_callout: None` because Snooty attributes them to the include file, but if the *page* carrying them has an `advisory` callout with an `exception_markers` phrase addressing the code's pattern, that counts as an adjoining caveat → **Intentional**. The caveat must be verified in the built AST (a `sharedinclude/...` provenance is valid); shared admonitions are pulled via `sharedinclude_root` and do NOT appear in a local `content/` grep, so never dismiss a callout as absent without checking the build.
2. The question is "is this a deliberate doc choice?" and it is answerable from in-repo evidence (compare sibling pages, check docset conventions) → **Writer-confirm**. This is the default home for judgment calls a writer can settle in minutes without an engineer (e.g. `connect.txt` omits TLS while sibling auth pages use `tls=True`).
3. The question requires a product/engineering judgment to settle (the pattern may be unavoidable for the API, the behavior may be correct-but-undocumented, the absence may reflect a real product constraint) → **Needs-eng-confirmation**.
4. Category is `absent_consideration` and the consideration's `applies_to` scope is fuzzy or the page only mentions the topic in passing → **Writer-confirm**.
5. Clear-cut violation of a named guideline (content demonstrably contradicts the rule, or an in-scope topic omits an unambiguous consideration) → **Confirmed**.
6. Real but minor, no ticket warranted unless requested → **Low-priority**.
