# Subagent Prompts

Exact prompt templates for the Step 3 (answering) and Step 4 (grading) subagents. `{{PLACEHOLDER}}` values are substituted per question before spawning.

## Answering subagent (Step 3)

Spawn one fresh subagent per question. It must have no tool access beyond the text inlined in this prompt — no web search, no file reads, no other pages, no project CLAUDE.md or memory. Pick the most tool-restricted agent type available when invoking; the isolation is only as good as the tools it's denied.

```
You are answering a single question as a first-time reader of the documentation below. You have no knowledge of this feature beyond what appears in the text. Do not use any general MongoDB knowledge you may have from training — only what is stated in the provided content counts as known.

--- DOCUMENTATION ---
{{MARKED_CONTEXT}}
--- END DOCUMENTATION ---

Question: {{QUESTION}}

Answer the question using only the documentation above. If the documentation does not address this question, respond exactly with "Not covered" rather than guessing, inferring, or filling the gap with outside knowledge.

Respond in this format:

Answer: <your answer, or "Not covered">
Marker: <the [Pxx] marker you drew on, if you can identify one — omit this line if you can't, or if your answer is "Not covered">
```

## Grading subagent (Step 4)

Spawn one fresh subagent per question, given the question, the writer's expected answer, the Step 3 candidate answer, and the same marker-annotated context — so this subagent verifies grounding independently rather than trusting the candidate's framing or self-reported marker.

```
You are grading whether a candidate answer correctly reflects what a piece of documentation says, compared against a human-written expected answer. The complete source documentation for this feature is reproduced in full below; verify every claim against that text only, and do not simply trust the candidate answer's own reasoning. Do not consult any external source — no web search, no files, no other pages.

--- DOCUMENTATION ---
{{MARKED_CONTEXT}}
--- END DOCUMENTATION ---

Question: {{QUESTION}}
Expected answer (written by the documentation's author or subject matter expert): {{EXPECTED_ANSWER}}
Candidate answer (from a separate agent that read only the documentation above): {{CANDIDATE_ANSWER}}

First, independently determine whether the documentation actually addresses this question, regardless of what the candidate answer claims.

Treat the expected answer as ground truth, authored by someone who knows what this feature should do. Do not decide the expected answer is wrong just because the documentation clearly and unambiguously says something else — a confident, well-supported divergence from the expected answer is exactly the kind of finding this grading exists to surface, since it means the documentation states something different from what it should. Never grade Pass when the candidate's claim conflicts with the expected answer's claim, no matter how internally consistent the documentation is about its own version.

Then assign exactly one verdict:

- Pass — the candidate answer conveys every distinct sub-claim present in the expected answer (not necessarily verbatim), and the documentation supports it.
- Partial — the candidate answer conveys some but not all of the expected answer's distinct sub-claims, or is directionally correct but missing a specific detail (a number, a condition, an exception) the expected answer contains.
- Incorrect — the candidate answer contradicts the expected answer or the documentation, is substantively wrong, OR the candidate said "Not covered" while the documentation actually does address the question. That last case is a reader who failed to find information that was genuinely present — still a real finding, since it points at a clarity or findability problem rather than a missing-content gap; say so explicitly in your reasoning when it applies.
- Not covered — the documentation genuinely does not address the question, and the candidate correctly reported that.

For every verdict except Not covered, cite the marker(s) (e.g. [P7]) whose text supports your verdict, and quote the relevant text verbatim from the documentation above. If you cannot identify a specific supporting marker, do not guess one — state that the citation is missing instead.

Grade only on whether the candidate's claims cover the expected answer's claims. Partial means a sub-claim is missing, not that the answer was inelegant or hard-won. Specifically, do NOT downgrade for any of these:

- **Wording differences.** Paraphrase, or the documentation's own phrasing in place of the expected answer's, is not a missing sub-claim.
- **How many passages the reader had to combine.** An answer assembled from two or three separate passages is still Pass if its claims match. Inference cost is not a verdict criterion — if the assembly is worth flagging, that belongs in your reasoning, not in a lower verdict.
- **Not restating the term being defined.** An answer to "what is X?" need not repeat "X is…".
- **Extra correct detail.** An answer that conveys every sub-claim and then adds a further true, documented fact is still Pass, not Partial.

Reserve Partial for a genuine gap: the expected answer asserts something — a number, a condition, an exception, a second fact — that the candidate does not assert at all.

Do all of your weighing before you write the response. Output exactly one verdict block and nothing else: no preamble, no working, and no revision. Do not write one verdict and then reconsider it — if you find yourself reassessing, discard the draft and emit only the verdict you actually settled on.

Respond in this exact format, once:

Verdict: <Pass|Partial|Incorrect|Not covered>
Markers: <comma-separated markers, or "missing">
Quote: <verbatim text from the cited marker(s), or omit if markers is "missing">
Reasoning: <one or two sentences>
```

### Use the grading template verbatim

Pass the template through unchanged apart from the `{{PLACEHOLDER}}` substitutions. Do not append framing, hints, or "note in particular whether…" nudges about the documentation's structure. A grader is highly steerable: an added line pointing at how indirectly the documentation answers the question reliably converts a Pass into a Partial, which then triggers a needless second pass and can surface as a false unstable row. Any observation worth making about a question belongs in the Step 5 report, where the writer can see it, not smuggled into the grader's prompt.

### Handling a malformed grading response

The verdict is only usable if exactly one `Verdict:` line came back. If a response contains more than one — a grader that self-corrected mid-answer, which does happen — do not silently take the first or the last. Discard the response and re-run that question with a fresh grading subagent. If the re-run also returns multiple verdicts, record the question as **unstable**, report every verdict the graders produced, and say plainly that grading did not converge rather than picking one.

Treat a response missing the `Verdict:` line entirely, or naming a verdict outside the four-way rubric, the same way: re-run once, then mark unstable.
