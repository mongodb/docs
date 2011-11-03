10gen Documentation Style and Conventions
=========================================

**2011-09-27**: Document created with a (very) rough list of style
guidelines, and conventions that would be helpful to setup sooner
rather than later to help us create high quality unified
documentation.

- File naming convention (and related URL naming convention.)

- Headlines and document titles should describe the content
  sufficiently that people can figure out what's in the section
  without needing to read the content (for better search and more
  efficient question answering.)

- Titles (e.g. "Using foo" vs. "How to Foo") [open question]

- Some basic overview on how to structure documents and use headlines.

- Conventional style points. Including, oxford commas (yes,)
  double-spaced terminal punctuation (no,) logical or American style
  for the interaction between enclosing punctuation and terminal
  punctuation (American with an exception,) title case for headings
  (yes.)

- Verb tense/mood, notes:

  - Use the second person. "If you need to back up your database,
    start by locking it first." (This should probably be "Before
    backing up a database, lock it first," which implies second
    person.)

  - Avoid the first person. "We will begin the backup process by
    locking the database."

  - When indicated, use the imperative mood. "Backup your databases
    often." "To prevent data loss, back up your databases."

  - The future perfect is also useful in some cases. "Creating disk
    snapshots without jingling of an unlocked database, will lead to
    an inconsistent state."

- In general avoid helper verbs (e.g "this does foo" vs. "this will do
  foo") to increase clarity.

- Contractions are acceptable, to increase readability and flow. p

- RST specific styles/habits: e.g. (h1: =; h2: -; h3: ~; h4: ^; h5: `),
  (hr: ------; ul-li: -;) link/ref formats; etc.

- Style around UL's. Issues to consider: Item capitalization and
  terminal punctuation after list items. Integration of lists into
  sentences. Use of colons around lists.

- Commit message style/requirements and other processes (e.g. trailing
  white space, column wrapping, etc.)

- Policies regarding build errors.

- Some sort of policy and system for describing the objectives for a
  document's content. (i.e. This document needs to address xyz.)

- Develop a fixed nomenclature for describing interface elements,
  architectural components (daemons, databases, processes, drivers,
  hosts, mongos' etc.)

  - Referring to proper nouns and capitalization/quoting
    rules. (i.e. "the "Hosts" page," or "the Hosts page," or "the
    hosts page")

- Spaces between nesting parentheticals (and elements) in javascript
  examples. (e.g. "``{ [ a, a, a ] }``" over "``{[a,a,a]}``")

- One word:

  - stanalone
  - workflow

- Examples

  - Example urls and domain names should be
    example.com/example.net/example.com.

    The example domains are reserved in the DNS spec for this purpose
    and people will notice (and complain about it.)

  - We should have some default variable, field and value names so we
    can be consistent.

- MongoDB Sphinx Domain Requirements

  - command
  - operator
  - status
  - (error code?)

- What to do with wiki pages like `EC2 Backups
  <http://www.mongodb.org/pages/viewpage.action?pageId=19562846>`_. They
  seem more ideal for the cookbook or the wiki but less than ideal for
  the manual.

- Shard clusters

- replica sets
