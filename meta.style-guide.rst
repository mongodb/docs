===========================================
MongoDB Documentation Style and Conventions
===========================================

This document provides an overview of the style for the MongoDB
documentation stored in this repository. The overarching goal of this
style guide is to provide an accessible base style to ensure that our
documentation is easy to read, simple to use, and straightforward to
maintain.

Also consider the `Documentation Organization
<meta.organization.rst>`_ (meta.organization.rst) document for more
information regarding the MongoDB Manual organization.

Document History
----------------

**2011-09-27**: Document created with a (very) rough list of style
guidelines, conventions, and questions.

**2012-01-12**: Document revised based on slight shifts in practice,
and as part of an effort of making it easier for people outside of the
documentation team to contribute to documentation.

**2012-03-21**: Merged in content from the Jargon, and cleaned up
style in light of recent experiences.

Naming Conventions
------------------

This section contains guidelines on naming files, sections, documents
and other document elements.

- File naming Convention:

  - For Sphinx, all files should have a ``.txt`` extension.

  - Separate words in file names with hyphens (i.e. ``-``.)

  - For most documents, file names should have a terse one or two word
    name that describes the material covered in the document. Allow
    the path of the file within the document tree to add some of the
    required context/categorization. For example it's acceptable to
    have ``/core/sharding.rst`` and ``/administration/sharding.rst``.

  - For tutorials, the full title of the document should be in the
    file name. For example,
    ``/tutorial/replace-one-configuration-server-in-a-shard-cluster.rst``

- Phrase headlines and titles so that they the content contained
  within the section so that users can determine what questions the
  text will answer, and material that it will address  without needing
  them to read the content. This shortens the amount of time that
  people spend looking for answers, and improvise search/scanning, and
  possibly "SEO."

- Prefer titles and headers in the form of "Using foo" over "How to Foo."

- When using target references (i.e. ``:ref:`` references in
  documents,) use names that include enough context to be intelligible
  thought all documentations. For example, use
  "``replica-set-secondary-only-node``" as opposed to
  "``secondary-only-node``". This is to make the source more usable
  and easier to maintain.

Style Guide
-----------

This includes the local typesetting, English, grammatical, conventions
and preferences that all documents in the manual should use. The goal
here is to choose good standards, that are clear, and have a stylistic
minimalism that does not interfere with or distract from the
content. A uniform style will improve user experience, and minimize
the effect of a multi-authored document.

Punctuation
~~~~~~~~~~~

- Use the oxford comma.

  Oxford commas are the commas in a list of things (e.g. "something,
  something else, and another thing.") before the conjunction
  (e.g. "and" or "or.")

- Do not add two spaces after terminal punctuation, such as
  periods.

- Use "American style" punctuation when enclosing punctuation
  (i.e. parentheses, quotes, and similar) interacts with terminal
  punctuation (i.e. periods, commas, colons, and similar.) This rule
  dictates that the terminal punctuation always goes *within* the
  enclosing punctuation, even if the terminal punctuation affects the
  sentence/clause outside of the quote or parenthetical.

  This is counter to the "logical style" which is default in British
  English, because its easier to be consistent and edit using this
  rule, and because the style of the documents tends towards American
  English.

  The one exception is if a literal string or inline code snippet is
  enclosed in quotations or parenthesis, it may make sense to move a
  period or comma further away from the literal string to avoid
  copy-and-paste errors or other confusion. For example, in this case,
  "``cfg.members[0].priorty = 1``." is worse than
  "``cfg.members[0].priorty = 1``".

- Use title case, that capitalizes the first letter of the first,
  last, and all significant words, for headings and document titles.

Verbs
~~~~~

Verb tense and mood preferences, with examples:

- **Avoid** the first person. For example do not say, "We will begin
  the backup process by locking the database," or "I begin the backup
  process by locking my database instance,"

- **Use** the second person. "If you need to back up your database,
  start by locking the database first." In practice, however, it's
  more concise to imply second person using the imperative, as in
  "Before inititating a back up, lock the database."

- When indicated, use the imperative mood. For example: "Backup your
  databases often" and "To prevent data loss, back up your databases."

- The future perfect is also useful in some cases. For example,
  "Creating disk snapshots without locking the database, will lead to
  an inconsistent state."

- Avoid helper verbs, as possible to increase clarity and
  concision. For example, attempt to avoid "this does foo" and "this
  will do foo" when possible. Use "does foo" over "will do foo" in
  situations where "this foos" is unacceptable.

Referencing
~~~~~~~~~~~

- To refer to future or planned functionality in MongoDB or a driver,
  *always* link to the Jira case. The Manual's ``conf.py`` provides
  for a "``:issue:``" role that will link directly to a Jira case
  (e.g. ``:issue:\`SERVER-9001\```).

- For non-object references (i.e. functions, operators, methods,
  database commands, settings) always reference only the first
  occurrence of the reference in a section. You should *always*
  reference objects, except in section headings.

General Formulations
~~~~~~~~~~~~~~~~~~~~

- Contractions are acceptable insofar as they are necessary to
  increase readability and flow. Avoid otherwise.

- Make lists grammatically correct.

  - Do not use a period after every item unless the list item
    completes the unfinished sentence before the list.

  - Use appropriate commas and conjunctions in the list items.

  - Typically begin a bulleted list with an introductory sentence or
    clause with a colon, comma, or semi-colon.

- The following terms are one word:

  - standalone
  - workflow

- Use "unavailable," "offline," or "unreachable" to refer to a
  ``mongod`` instance that cannot be accessed rather than the
  colloquialism "down."

- Always write out units (e.g. "megabytes") rather than using
  abbreviations (e.g. "MB".)

Structural Formulations
~~~~~~~~~~~~~~~~~~~~~~~

- There should be at least two headings at every nesting level. Within
  an "h2" block, there should either be: no "h3" blocks, 2 "h3"
  blocks, or more than 2 "h3" blocks.

- Section headers should be in title case (capitalize first, last, and
  all important words,) and should effectively describe the contents
  of the section. In a single document you should strive to have
  section titles that are not redundant and grammatically consistent
  with each other.

- Use paragraphs and paragraph breaks to increase clarity and
  flow. Avoid burying critical information in the middle of long
  paragraphs. Err on the side of shorter paragraphs when possible.

- Shorter sentences are better than longer sentences. Use complex
  formations (e.g. compound complex structures that require
  semi-colons.) only as a last resort, if at all.

- In general, avoid paragraphs that consist of single sentences as
  they often represent a sentence that has unintentionally become too
  complex or incomplete. However, sometimes such paragraphs are useful
  for emphasis, summary, or introductions.

  As a corollary, most sections should have multiple paragraphs.

- For longer lists and more complex lists, use bulleted items rather
  than integrating them inline into a sentence.

- Do not expect that the content of any example (inline or blocked,)
  will be self explanatory. Even when it feel redundant, make sure
  that the function and use of every example is clearly described.

ReStructured Text and Typesetting
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Use spaces between nesting parentheticals (and elements) in
  JavScript examples. For example, prefer "``{ [ a, a, a ] }``" over
  "``{[a,a,a]}``".

- For underlines associated with headers in RST, use:

  - ``=`` for heading level 1 or h1s. Use underlines and overlines for
    document titles.
  - ``-`` for heading level 2 or h2s.
  - ``~`` for heading level 3 or h3s.
  - ````` for heading level 4 or h4s.

- Use hyphens (``-``) to indicate items of an ordered list.

- Place footnotes and other references, if you use them, at the end of
  a section rather than the end of a file.

  Use the footnote format that includes automatic numbering and a
  target name for ease of use. For instance a footnote tag may look
  like: "``[#note]_``" with the corresponding directive holding the
  body of the footnote that resembles the following: "``.. [#note]``".

- As it makes sense, use the "``.. code-block:: [language]``" form to
  insert literal blocks into the text. While the double colon,
  "``::``", is functional, the directive makes the source easier to
  read and understand.

- For all mentions of referenced types (i.e. database commands, query
  operators, aggregation framework expressions and pipeline operators,
  java script functions, statuses, etc.) use the reference types to
  ensure uniform formatting and cross-referencing.

Jargon and Common Terms
-----------------------

MongoDB and Database Organization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Refer to MongoDB as "MongoDB" rather than mongo or Mongo when referring
to the entire database system, including possibly ``mongod`` and
``mongos``.

Refer to ``mongod`` or ``mongos`` by name to indicate the database
process, or server instance itself. These are "processes" or
"instances." Reserve "database" for referring to a database (i.e. the
structure that holds collections and refers to a group of files on
disk.)

Data Structures
~~~~~~~~~~~~~~~

Use the following convention when referring to specific parts of
MongoDB data:

- *document* refers to "rows," or records in a MongoDB
  database. Potential confusion with "JSON Documents."

  Do not refer to documents as "objects," because drivers (and
  MongoDB) do not preserve the order of fields when fetching data. If
  the order of objects matter, use an array.

- *field* refers to a "key" or "identifier" of data within a MongoDB
  document.

- *value* refers to the contents of a *field*.

Use "sub-document" as needed to describe nested documents.

Notes on Specific Features
~~~~~~~~~~~~~~~~~~~~~~~~~~

- Geo-Location

  #. While MongoDB *is capable* of storing coordinates in
     (sub-documents,) in practice, users should only store coordinates
     in arrays. (See: `DOCS-41 <https://jira.mongodb.org/browse/DOCS-41>`_)

- *Others...*

Other Terms
~~~~~~~~~~~

- Use "**shard cluster**," to refer to a collection of ``mongod``
  instances that hold a sharded data set. Use the term "**replica
  set**," to refer to a collection of ``mongod`` instances that
  provide a replicated data set. Do not use the word "cluster" to
  refer to a replication only deployment.

- Use "``example.net``" (and ``.org`` or ``.com`` if needed) for all
  examples and samples.

The documentation project does not, as of early 2012, have a fixed set
of nomenclature for describing interface elements, architectural
components (daemons, databases, processes, drivers, hosts, mongos'
etc.) Similarly, there is no standard nomenclature or examples for
field names, values, variables, and other components of code examples.

At some point in the near future creating a more standardized the
nomenclature for examples of architectural elements and code
components may be necessary.
