# Universal Security Guidelines

The MongoDB-relevant security baseline common to all docsets. Stage 2 always checks extracted content against these **plus** the manifest's per-docset `security_considerations`. Manifests extend this list; they do not duplicate it.

Each guideline has a stable `id` (used as the finding `guideline` field), a one-sentence `rule`, the finding `category` it primarily drives, and a `grounding` note citing the in-repo source that establishes it as a real MongoDB best practice (not a fabricated criterion).

General software-security principles (no MongoDB-specific claim) are marked `[general]` and need no grounding; they are universally accepted and not at risk of being wrong about a MongoDB-specific behavior.

---

## Out of scope (covered by other tooling)

Per DOCSP-61901, secret/credential scanning is out of scope — GitHub's built-in secret scanning already detects real, pattern-matching secrets (cloud-provider keys, tokens) committed to the repo, including in doc source. Do **not** raise leaked-secret findings for credentials in code examples:

- A **real-looking** credential in an example is the case GitHub secret scanning already catches — flagging it here is duplicative.
- A **placeholder** (`<password>`, `***`, `YOUR_PASSWORD`) is not a secret at all and is never a leaked-secret finding.

The docs-specific credential concern (examples should *teach* secure handling — prefer environment variables / external secret management over inline secrets) is a pedagogical pattern issue, not secret scanning. It is not a universal guideline; if a docset wants it, add it as a per-docset consideration during Stage 0.

**Exception:** MongoDB-specific key material that GitHub secret scanning does not recognize — e.g. CSFLE / Queryable Encryption data-encryption keys and customer master keys (base64 blobs, not partner patterns) — **is** in scope and is covered as a per-docset consideration where applicable (see `pymongo-csfle-no-hardcoded-key`).

---

## U-1: enable-tls-by-default

- **Rule:** Connection examples must enable TLS, either via the `mongodb+srv://` format (which enables TLS automatically) or an explicit `tls=true` parameter. Examples that show plain `mongodb://` without TLS should note that TLS must be enabled separately, or use `+srv`.
- **Scope:** Applies to pages whose subject is establishing a connection (connection guides, connection targets, quick starts, authentication-mechanism pages). Do NOT raise U-1 against:
  - `localhost` / `127.0.0.1` connection strings (local development).
  - Examples written as `mongodb[+srv]://` that tell the reader to choose the format; the `+srv` option enables TLS.
  - Snippets on a page whose subject is a non-TLS option (timeouts, compression, server selection, Stable API, UUID representation, and so on), when the docset has a dedicated TLS page.
- **Grouping:** When the same plain-`mongodb://` pattern repeats across several in-scope pages, raise one candidate listing every affected page rather than one per page.
- **Category:** `insecure_code_example`, `counter_best_practice_advice`
- **Grounding:** `content/drivers/source/client-libraries-best-practices.txt` — "Use SRV Connection Strings" section: the `+srv` format "automatically enables Transport Layer Security (TLS) for the connection ... by default. The standard format doesn't enable TLS unless you set it explicitly."

## U-2: validate-untrusted-input-before-json-to-bson

- **Rule:** Examples that convert untrusted JSON to BSON and use the result in a query/update/command must type-check and validate the input first, or use a typed document builder / query builder. Examples must not concatenate untrusted input into a JSON string before conversion.
- **Category:** `insecure_code_example`, `counter_best_practice_advice`
- **Grounding:** `content/drivers/source/client-libraries-best-practices.txt` — "Validate Untrusted Input Before Converting JSON to BSON" section: an attacker can change the meaning of an operation by substituting an object for an expected scalar (e.g. `{"name": {"$ne": null}}`), and string concatenation "can escape the intended field value and inject arbitrary query syntax."

## U-3: no-server-side-js-from-user-input

- **Rule:** Examples must not build `$where`, `$function`, `$accumulator`, or `mapReduce` expressions by concatenating or interpolating untrusted input into a JavaScript string. Where server-side scripting is unnecessary, examples may show disabling it (`security.javascriptEnabled: false` or `--noscripting`).
- **Category:** `insecure_code_example`, `counter_best_practice_advice`
- **Grounding:** `content/drivers/source/client-libraries-best-practices.txt` — "Restrict Server-Side JavaScript Execution" section: when an application builds one of these expressions from user input, "the server executes that input as code ... the same class of risk as passing untrusted input to an `eval` function."

## U-4: no-tls-disable-without-justification

- **Rule:** Examples must not disable TLS (`tls=false`, `ssl=false`, `--insecure`, certificate verification skip) without a caveat explaining when that is acceptable (e.g. local development only). Prose must not recommend disabling TLS for production deployments without justification. **Scope: MongoDB connections and deployed MongoDB-backed application endpoints.** Do NOT raise U-4 against single-line diagnostic snippets that make no MongoDB connection and handle no credentials (e.g. a `requests.get(..., verify=False)` probe to a TLS-checker service) — those are ceremony, not MongoDB security guidance.
- **Category:** `insecure_code_example`, `counter_best_practice_advice`
- **Grounding:** `[general]` — universally accepted; complements U-1's TLS-by-default rule.

## U-5: least-privilege-db-users

- **Rule:** Examples and prose that create or configure database users should grant the minimum privileges required, not blanket roles. Prose that recommends a broad role (e.g. `root`, `dbOwner`) where a narrow role suffices is a candidate finding unless the context justifies it.
- **Category:** `counter_best_practice_advice`, `absent_consideration`
- **Grounding:** `[general]` — universally accepted principle of least privilege.

## U-6: do-not-recommend-disabling-auth

- **Rule:** Prose must not instruct readers to disable authentication (`--noauth`, removing auth mechanisms) for production or general use without an explicit, scoped justification. Disabling auth for a local development sandbox is acceptable if caveated.
- **Category:** `counter_best_practice_advice`
- **Grounding:** `[general]`.

---

## Notes for Stage 2

- **Leaked secrets are out of scope.** Do not raise leaked-secret findings for credentials or plaintext passwords in examples — real ones are caught by GitHub secret scanning; placeholders are not secrets. Two per-docset exceptions: MongoDB-specific key material (CSFLE/QE keys), and a manifest consideration about how examples retrieve credentials, which can flag inline placeholders under its own exemptions.
- **Caveated insecure patterns are not Confirmed.** If an example demonstrates an insecure pattern (e.g. TLS off) inside a `.. warning::` / `.. important::` callout that explains the restriction, it is **Intentional** per the manifest's `exception_markers`, not a Confirmed finding.
- **General principles are weaker signals than grounded ones.** When a finding rests only on a `[general]` guideline, prefer **Needs-eng-confirmation** over Confirmed. The grounded MongoDB-specific guidelines (U-1, U-2, U-3) carry higher confidence.
- **Do not invent guidelines.** If content looks insecure but matches no guideline here and no manifest consideration, do not raise a candidate. Add the guideline to the universal list or the manifest first (with grounding), then re-run.
