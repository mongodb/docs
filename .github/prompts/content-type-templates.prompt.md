# Content Type Templates

These templates apply to all new content generation tasks. When writing a new
page from scratch, identify the content type first and apply the corresponding
template. When reviewing or editing existing content, flag sections that
violate the boundary rules below.

## Enforcement model

| Content type    | Structure enforcement | Reason |
|-----------------|-----------------------|--------|
| Task            | Strict                | Procedural correctness depends on order and completeness |
| Reference       | Strict                | Experienced users scan; consistency reduces friction |
| Concept         | Flexible              | Explanation serves the reader, not the outline |
| Troubleshooting | Strict                | Diagnostic workflows must be sequentially correct |

**Strict:** Required sections must be present, in order, with the specified
heading text. Do not rename, reorder, or omit them.

**Flexible:** Required sections must be present, but heading wording may vary
to fit the content. Order may vary when there is a clear reason.

---

## Content Type Detection

When reviewing or editing existing content, identify its content type. Apply the detection rules below, stopping at the first match, and summarize deviations from the matching content template to the user.

**1. Task** — if the file contains ANY of:
- `.. procedure::` or `.. step::` directive
- Numbered list sections with headings like `A.`, `B.`, `1.`, `2.`
  (legacy pages that predate `.. procedure::`)
- Section headings: `Steps`, `Procedure`, `Before you Begin`, `Prerequisites`
- File path contains a `/tutorial/` directory
- Common additional markers (not required): `About this Task` or `Next Steps`
  headings; imperative verb title (Configure, Create, Add, Change, Build)

**2. Reference** — if the file contains ANY of:
- `.. list-table::` with `Field`, `Type`, `Description` columns
- `Syntax` heading followed by a code block
- `Command Fields` or `Parameters` heading
- `Definition` heading at top of content
- `.. dbcommand::`, `.. method::`, `.. setting::`, or `.. option::` directives
- File path contains a `/reference/` directory
- Common additional markers: `Compatibility` heading; `Behavior` or `Behaviors`
  heading combined with syntax or parameters; noun phrase title

**3. Troubleshooting** — if the file contains ANY of:
- `Prerequisite Checks`, `Verify Resolution`, or `Diagnostics to Collect` headings
- A title describing a symptom or error condition
- File path contains a `/troubleshooting/` directory

**4. Concept (default)** — if none of the above match.
- Typical signals: `Use Cases` or `Get Started` headings; `Behavior` heading
  without syntax or parameters; explanatory content without procedures or
  parameter tables; file path contains `/core/`; noun phrase title

**Detection priority:** Check explicit structural markers first (directives,
table formats), then directory path, then section headings. Default to Concept
if ambiguous.

---

## Task

**Purpose:** Instructs the user how to accomplish a specific goal. The user
leaves the page having done something.

**Title format:** Present-tense imperative verb + object.
- Correct: *Configure a Replica Set*
- Incorrect: *Replica Set Configuration* (noun phrase) or *How do I configure
  a replica set?* (question)

### Required sections (strict order)

**Introduction (no heading)**
One short paragraph. Answer: what is this task, what is it for, and why does
the user care? May link to a concept page for background. Do not explain the
concept here — link to it.

**About this Task** *(optional)*
Conceptual or behavioral information directly necessary to complete the task.
Use a bulleted list with links if content is extensive. If the information
would apply to more than one task, it belongs in a concept page, not here.

**Before you Begin** *(optional)*
Unordered or ordered list of prerequisites. State what the user must have,
have done, or have access to before starting. Do not bury permissions or
environment requirements inside steps.

**Steps** *(required)*
Numbered steps using the ``.. procedure::`` directive. Each step is a single
action. Provide expected output or a success indicator after steps where
failure is likely or the result is non-obvious. Include Atlas and self-managed
variations when the procedure differs. Use includes when steps are shared with
a reference page.

**Example** *(optional)*
A complete worked example if one was not woven through the steps. Use includes
to single-source examples shared with the reference page.

**Next Steps** *(optional)*
Links to the one or two logical follow-on tasks. Not a general related-links
section.

**Learn More** *(required)*
Links to related concepts, reference pages, and less-common task variants not
linked above.

### What does not belong in a task

- **Conceptual explanation beyond what is needed to complete the steps.** A
  sentence of context is acceptable; a paragraph is a signal to link out to a
  concept page instead.
- **Reference material** such as parameter tables or full syntax definitions.
  Link to the reference page.
- **Multiple distinct tasks on one page.** If the user has two different end
  goals, those are two task pages. Tabbed variations of the same task (for
  example, Atlas UI vs. CLI) are acceptable on one page.
- **Troubleshooting content.** Do not add "If this fails" sections. Link to a
  troubleshooting page if one exists.

---

## Concept

**Purpose:** Helps the user understand what something is, why it exists, and
how it works. The user leaves the page with understanding, not a completed
action.

**Title format:** Noun or noun phrase.
- Correct: *Replica Set Elections*
- Incorrect: *Understanding Replica Set Elections* (gerund) or *What are
  Replica Set Elections?* (question)

### Required sections (flexible order and heading wording)

**Introduction (no heading)**
One to two short paragraphs. Answer: what is this, and why should the user
care? Anchor the explanation so a reader who is new to the concept can orient
themselves before reading further.

**Use Cases** *(required unless the concept has no distinct use cases)*
Short descriptions of when and why a user would use this feature. Sets
expectations and differentiates this feature from alternatives. Do not
describe steps here — link to task pages instead.

**Behavior** *(required if the feature has meaningful constraints or
operational details)*
Technical details a user needs to know before using the feature: performance
considerations, version support, sharded cluster behavior, Versioned API
compatibility, Atlas-specific behavior. Use subheadings for readability.
If a user must read this section to use the feature safely, it belongs here,
not in Details.

**Get Started** *(required if task pages exist for this concept)*
Links to the most common related task pages. Two to four links. Not a complete
index — use Learn More for less common tasks.

**Details** *(optional)*
Supplemental technical depth that is not needed to start using the feature:
architecture internals, edge cases, advanced behavior. Keep this section
clearly supplemental.

**Learn More** *(required)*
Links to related concepts, reference pages, and task pages not already linked
above.

### What does not belong in a concept

- **Step-by-step instructions.** A sentence like "to enable this, run X" is
  acceptable; a numbered procedure is not. Link to the task page.
- **Complete syntax definitions or parameter tables.** Summarize and link to
  the reference page.
- **Troubleshooting guidance.** Link to troubleshooting pages.

---

## Reference

**Purpose:** Delivers precise, scannable information for experienced users who
know what they are looking for. The user leaves the page knowing exactly how
to use a specific command, method, operator, or parameter.

**Title format:** The name of the item being documented.
- Correct: *db.collection.find()* or *mongod Server Parameters*
- Incorrect: *Using db.collection.find()* (verb phrase)

### Required sections (strict order)

**Definition (no heading, or item name as heading)**
One short paragraph. What does this do and when is it used? May link to a
concept or task page. Do not explain the underlying concept here.

**Compatibility** *(required if the item is not available in all MongoDB
editions and deployment types)*
List supported editions: Atlas (specify cluster tier if relevant), MongoDB
Enterprise, MongoDB Community. Use the standard includes where available. Do
not write compatibility details in prose — use the defined format.

**Syntax** *(required for commands, methods, and operators)*
Code block with complete syntax. Show all parameters. No prose explanation
inside the code block.

**Command Fields / Parameters** *(required if the item takes parameters)*
Table format. Columns: Field, Type, Necessity (Required / Optional /
Conditional), Description. For server parameters, also include: mongod/mongos
support, version added or changed, OS availability, argument type, default
value, startup/runtime support. Follow the server parameters guidelines for
field order.

**Behaviors** *(optional)*
Behaviors specific to this item only. Do not include general feature behavior
— that belongs in the concept page. If a behavior applies to a category of
commands, link to the concept page.

**Examples** *(optional but strongly preferred)*
Most common use cases as runnable code. Use includes if examples are shared
with a task page.

**Learn More** *(required)*
Links to related concept and task pages.

### What does not belong in a reference

- **Conceptual explanation** beyond the one-sentence definition. Link to the
  concept page.
- **Step-by-step procedures.** Link to the task page.
- **Troubleshooting guidance.** Link to troubleshooting pages.
- **Behaviors that apply to the broader feature,** not this specific command.
  Link to the concept page's Behavior section.

---

## Troubleshooting

**Purpose:** Helps the user diagnose and resolve a specific problem, error
condition, or unexpected behavior. The user leaves the page having identified
a root cause and taken corrective action.

**Title format:** Short description of the symptom or error the user sees.
- Correct: *Replica Set Primary Not Elected*
- Incorrect: *How to Fix a Replica Set with No Primary* (question or solution
  statement)

### Required sections (strict order)

**Introduction (no heading)**
One to two sentences summarizing the error message, symptom, or unexpected
behavior using exact text or keywords the user might search. Optionally, one
to three sentences on likely causes. Link to conceptual documentation for
background — do not explain it here.

**Prerequisite Checks** *(required)*
Short steps to confirm the user is experiencing this issue before attempting
any fix. Typically involves ``serverStatus()`` metrics, log output,
aggregation results, or Atlas Performance Advisor. For each check, document
what the user should expect to see when the issue is present. Do not mix
diagnostic steps with fix steps.

**Common Issues and Resolutions** *(required)*
Condition-based subheadings. For each condition: state the indicator ("If your
output shows X..."), then provide numbered resolution steps using the
``.. procedure::`` directive. Include Atlas and self-managed variations when
the fix differs. Do not combine multiple root causes under one subheading.

**Verify Resolution** *(required)*
Tell the user exactly how to confirm the problem is resolved. Provide expected
output or system state. Do not omit this section — leaving users uncertain
whether the fix worked is a documentation failure.

**Diagnostics to Collect** *(required)*
If the user needs to escalate to support, specify what to gather: commands,
log files, FTDC data. Be specific.

**Related Issues** *(optional)*
Links to other troubleshooting pages or known issues that may be relevant if
the conditions above do not match the user's situation.

**Support Escalation** *(required)*
End the page with: "If the issue persists, contact
:ref:`Technical Support <technical-support>`."

**Learn More** *(required)*
Links to related concept pages, task pages, and reference pages relevant
to the documented issue.

### What does not belong in a troubleshooting page

- **Conceptual explanation beyond what is needed for diagnosis.** One to three
  sentences of context is acceptable. Anything more belongs in a concept page,
  linked from the introduction.
- **General how-to steps unrelated to the problem.** If the resolution
  requires completing a setup task, link to the task page rather than
  repeating the steps.
- **Multiple unrelated problems on one page.** Each troubleshooting page
  addresses one symptom or error condition. If two problems share a root
  cause, that is still two pages with a shared link.
- **Vague resolution steps.** "Check your configuration" is not a resolution
  step. Every step must be actionable and specific.

---

## Shared rules (all content types)

- Every page ends with a **Learn More** section.
- Use includes for any code example that appears on more than one page. Do not
  duplicate code across concept, task, and reference pages.
- When content clearly belongs to a different type, do not add it — link to it.
