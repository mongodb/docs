===========================================
MongoDB Documentation Style and Conventions
===========================================

This document provides an overview of the style for the MongoDB
documentation stored in this repository. The overarching goal of this
style guide is to provide an accessible base style to ensure that our
documentation is easy to read, simple to use, and straightforward to
maintain.

Document History
----------------

**2011-09-27**: Document created with a (very) rough list of style
guidelines, conventions, and questions.

**2012-01-12**: Document revised based on slight shifts in practice,
and as part of an effort of making it easier for people outside of the
documentation team to contribute to documentation.

Naming Conventions
------------------

This section contains guidelines on naming files, sections, documents
and other document elements.

- File naming Convention:

  - For Sphinx, all files should have a ``.rst`` extension.

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

- When indicated, use the imperative mood. "Backup your databases
  often." "To prevent data loss, back up your databases."

- The future perfect is also useful in some cases. "Creating disk
  snapshots without locking the database, will lead to an inconsistent
  state."

- Avoid helper verbs, as possible to increase clarity and
  concision. For example, attempt to avoid "this does foo" and "this will
  do foo" when possible, and using "does" over "will do" when "this
  foos" is unacceptable.

General Formulations
~~~~~~~~~~~~~~~~~~~~

- Contractions are acceptable to increase readability and flow.

- Shorter sentences are better than longer sentences. Use complex
  formations (e.g. compound complex structures that require
  semi-colons.) only as a last resort, if at all.

- For longer lists and more complex lists, use bulleted items rather
  than integrating them inline into a sentence.

- Make lists grammatically correct.

  - Do not use a period after every item unless the list item
    completes the unfinished sentence before the list.

  - Use appropriate commas and conjunctions in the list items.

  - Typically begin a bulleted list with an introductory sentence or
    clause with a colon, comma, or semi-colon.

- The following terms are one word:

  - standalone
  - workflow

ReStructured Text and Typesetting
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Use Spaces between nesting parentheticals (and elements) in
  JavScript examples. For example, prefer "``{ [ a, a, a ] }``" over
  "``{[a,a,a]}``".

- For underlines associated with headers in RST, use:

  - ``=`` for heading level 1 or h1s. Use underlines and overlines for
    document titles.
  - ``-`` for heading level 2 or h2s.
  - ``~`` for heading level 3 or h3s.
  - ``~`` for heading level 3 or h3s.

- Use hyphens (``-``) to indicate items of an ordered list

- Place footnotes, if you use them, at the end of a section rather
  than the end of a file.

  Use the footnote format that includes automatic numbering and a
  target name for ease of use. For instance a footnote tag may look
  like: "``[#note]_``" with the corresponding directive holding the
  body of the footnote that resembles the following: "``.. [#note]``".

- As it makes sense, use the "``.. code-block:: [language]``" form to
  insert literal blocks into the text. While the double colon,
  "``::``", is functional, the directive makes the source easier to
  read and understand.
