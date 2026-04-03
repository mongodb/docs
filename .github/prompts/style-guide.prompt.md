# Style Guide

Apply these rules to all new and significantly revised content.

## Voice and Tone
- Use active voice. Make the subject perform the action.
- Use passive voice only in these cases: to avoid blaming the user, when
  active voice is awkward, or to emphasize the object over the performer.
  - Passive (acceptable): "The flag was set incorrectly."
  - Active (avoid here): "You set the flag incorrectly."
- Use present tense as the default. Use future tense only to emphasize
  something that occurs later from the user's perspective. Use past tense
  only for references to past events or earlier releases.
- Keep sentences to 20–25 words. If you write a sentence longer than 25
  words, split it.
- Place conditional clauses at the start of sentences, not the end.
  - Prefer: "If the value is stored as an integer, Atlas truncates it."
  - Avoid: "Atlas truncates the value when stored as an integer."
- Avoid expletive structures. Do not start sentences with "It is" or
  "There is / There are" unless absolutely necessary for clarity.
- Use second person ("you") or imperative mood. Avoid first person
  ("we", "I"). Prefer imperative over second person where it is more
  concise.
  - Prefer: "Run the following command."
  - Avoid: "You should run the following command."
- Do not switch person within the same document.
- Tone: empathetic, professional, direct, and globally accessible. Avoid
  idioms, colloquialisms, and culturally specific metaphors or examples.
- Use interjections sparingly. Reserve them for novice-facing content
  only (e.g., "Congratulations!"). Never use them in reference material.

## Paragraphs
- Keep each paragraph to one idea and four to five sentences.
- Avoid one-sentence paragraphs in explanatory prose. Single-sentence introductions before code blocks, lists, or procedures are acceptable.
- Use a bullet list when presenting three or more items.

## Grammar and Word Choice
- Use strong, action-oriented verbs. Avoid nominalizations.
  - Prefer: "Configure the replica set."
  - Avoid: "Perform configuration of the replica set."
- Use single-word verbs over phrasal verbs.
  - Prefer: "Determine the type of encryption."
  - Avoid: "Figure out the type of encryption."
- Avoid subjunctive mood words (should, could, would) when expressing
  uncertainty. Exception: use "should" deliberately to indicate a
  recommendation rather than a mandatory step.
  - Uncertainty (avoid): "The logs should download as a .CSV file."
  - Recommendation (acceptable): "To avoid data loss, you should renew
    claims periodically."
- Use positive language rather than negative constructions.
  - Prefer: "The software works when installed correctly."
  - Avoid: "The software won't work unless installed correctly."
- Avoid strong negative words. Replace "damage" with "affect,"
  "catastrophic" with "serious."
- Use gender-neutral pronouns. Default to plural subjects where possible
  to avoid singular pronoun ambiguity.
- Ensure pronouns clearly refer to their antecedents. Do not start a
  sentence with "it," "this," or "these" unless immediately followed by
  a noun.
- Use "that" for restrictive clauses (no commas) and "which" for
  nonrestrictive clauses (with commas). Always include "that" — do not
  omit it.
  - Prefer: "Enter the username and password that you just created."
  - Avoid: "Enter the username and password you just created."
- Replace Latin abbreviations with English equivalents:
  - i.e. → "that is"
  - e.g. → "for example"
- Use American English spelling. Do not use the same word with different
  meanings, or different words for the same concept, within the same
  document.
- Avoid anthropomorphizing MongoDB beyond standard industry usage
  (detect, store, process, accept, deny, read, write are acceptable;
  needs, wants, knows, thinks are not).
- Do not use idioms or colloquialisms. Write for a global audience, many
  of whom read English as a second language.
- Avoid terms identified as oppressive. For example: use blocklist and
  allowlist, not blacklist and whitelist.

## Punctuation
- Use periods at the end of all complete sentences.
- Use serial (Oxford) commas.
- Do not use semicolons, slashes, exclamation marks, question marks,
  ellipses, or single quotes in documentation prose. Do not modify
  existing question-mark headings unless explicitly instructed.

## Accessibility
- Use meaningful link text. Do not use "click here" or "read more."
- Provide alt text for all images.
- Provide context for all UI elements — do not rely on color, position,
  or appearance alone.
  - Prefer: "Click Save."
  - Avoid: "Click the green button."
- Use simple tables. Avoid merged cells.

## Headings and Titles
- Use AP headline-style capitalization for all headings and titles: capitalize
  the first, last, and all significant words. Do not capitalize articles,
  coordinating conjunctions, or prepositions unless they are the first or last
  word.
- Tutorial and high-level process titles begin with a gerund (e.g., "Deploying
  a Replica Set").
- Task topic titles begin with an imperative verb (e.g., "Deploy a Replica
  Set").
- Do not include "MongoDB" in a title unless it is a product landing page.

## Lists

- Introduce every list with a complete sentence ending in a colon.
- Do not specify the number of items in the list introduction.
- Capitalize the first word of each list item.
- Make all list items grammatically parallel.
- Punctuation in list items:
  - All sentences or imperative statements: punctuate each item.
  - All fragments: no punctuation on any item.
  - Mixed fragments and sentences: punctuate every item.
- Do not connect list items with commas or conjunctions.
- Do not start list items with articles (a, an, the).

## Contractions
- Use contractions when they improve readability and flow. Avoid them
  in reference pages, tables, and parameter descriptions.

## Version References
- Use "earlier" and "later" when referring to versions. Never use "higher,"
  "lower," "older," or "newer."
  - Prefer: "MongoDB 7.0 or later"
  - Avoid: "MongoDB 7.0 or higher"

## MongoDB Terminology
- Use "MongoDB" for the database system. Do not use "mongo" or "Mongo".
- Use "mongod" or "mongos" for processes or server instances. Refer to them as
  "processes" or "instances", not "servers" or "databases".
- Use "replica sets", not "clusters" or "sharded systems" for replicated
  configurations.
- Use "sharded clusters", not "shard clusters" or "sharded systems".
- Use "document" for rows or records. Do not use "object", "record", or "row".
- When referencing future or planned functionality, always link to the Jira
  case using the ``:issue:`` role (e.g., ``:issue:\`SERVER-9001\``).
