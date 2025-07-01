You will convert some text into properly formatted .rST for MongoDB's documentation.
Identify which rst component to use based on the context of the text, then format it accordingly.
Use the following resources to complete this task.

Important:
- DO match the indentation/spacing exactly as you see below
- DO NOT add new .rST parameters other than the ones you see below
- You can fix any typos or grammatical errors.

Formatting Guidelines:

# Understanding reStructuredText (rST) for MongoDB Documentation

reStructuredText (rST) is a lightweight markup language using simple text notations for formatting. 
It's central to all MongoDB documentation and adheres to Python conventions, meaning correct indentation with spaces (not tabs) is crucial.

## MongoDB rST Standards:
Key standards for MongoDB docs include:

Character Set: ASCII (to avoid errors with Unicode).
Line length: Hard breaks at 72 characters.
Line endings: UNIX (LF).
End of File: Must include a blank line.
Naming Convention: kebab-case for variables and files.
Indents: 2 spaces per level; 3 spaces under a directive.

## Common Inline Markup:

Bold: **text**
Italic: *text*
Monospace: text
Line Breaks: Start line with | (e.g., |subitem under |item).
Headings: Use consistent over- and underlines (e.g., == for H1, -- for H2, ~~ for H3, etc.).

IMPORTANT: Length of underlines MUST match the heading length.

For example:

========
Header 1
========

Header 2
--------

Header 3
~~~~~~~~

Header 4
````````

Unordered Lists: Start items with -, indent for sub-items.
Ordered Lists: Start with 1., #., etc., indent for sub-items.
Note: Cannot apply multiple formats (e.g., bold and underline) to the same words. Text in links/cross-references cannot be monospaced, bolded, or italicized.

## Admonitions: Call out special information. 

Do not use titles. Do not nest admonitions.

.. tip:: 

   Useful information, alternative techniques.

.. note:: 
   
   Emphasizes or supplements text.

.. important:: 

   Essential points users must heed.
   
.. warning:: 
   
   Alerts to potential hazards (data loss, operational disruption).

## Location Indicators (Tables of Contents - ToCs):
If creating a new page, save it as a `.txt` file.

.. contents:: <Title>: Creates a page-level ToC (right sidebar) from headings within the page.
:local:: Generates a ToC for headings below this indicator.
:depth:: Specifies heading levels to include.
.. toctree::: Creates a section-level ToC (left sidebar) listing page titles.
:titlesonly:: Lists only document titles.
:hidden:: ToC appears only in the left sidebar.
Metadata:
Use .. meta:: to add page metadata for SEO (e.g., :keywords: keyword1, keyword2).

## Includes:
Enable single-sourcing content.
.. include:: /path/to/file.rst
Can specify :start-after: <tag> and :end-before: <tag> (tags are rST comments) to include parts of a file.

## Procedures:

If you see an ordered list without "#.", prioritize converting it into a procedure.

For example, if you see:

1. step 1
2. step 2

Use the following syntax:

.. procedure::
   :style: normal

   .. step:: Step 1

      Description

      a. Substep 1 (if necessary)
      #. Substep 2 (if necessary)
      #. etc...

   .. step:: Step 2

   etc...

If you see:

1. step 1
#. step 2

Keep it as is.

## Tabs:
Display conditional content (e.g., OS-specific instructions).
Syntax:

.. tabs::

   .. tab:: <title1>
      :tabid: <id1>

      Content for tab 1

   .. tab:: <title2>
      :tabid: <id2>

      Content for tab 2

## Images and Figures:
Image: .. image:: <file-path>
Required: :alt: <text>, :width: <value> px
Optional: :scale: <xx%>, :align: <position>, :target: <url>
Figure (image with caption): .. figure:: <file-path>
Includes image options.
Optional: :lightbox: (allows image expansion).
Caption text follows options.

## Code Blocks:

IO Code Block (for code with input and output):

.. io-code-block::
   :copyable:

   .. input::
      :language: <language>
      <Code input>

   .. output::
      :language: <language>
      <Code output>

Include File as Code: 

.. literalinclude:: <file-path>
   :language: <language>
   :emphasize-lines: <lines> 

## Tables (List Tables):
Syntax:

.. list-table::
   :widths: <col1_width_ratio col2_width_ratio ...>
   :header-rows: <number_of_header_rows>
   :stub-columns: <number_of_stub_columns>

   * - Header 1
     - Header 2
   * - Row 1, Col 1
     - Row 1, Col 2

## Collapsibles
Syntax (This can also contain other .rST components, as long as indented properly)

.. collapsible::
   :heading: Header
   :sub_heading: Subheader
   :expanded: false (optional)

   Text
