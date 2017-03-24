# docs-tutorials

Tutorials site for MongoDB products and services.

## Installation Instructions

    brew install hugo mmark

## Building Instructions

    make

## Contributing

Write tutorial content using the
[mmark](https://github.com/miekg/mmark/wiki/Syntax) markup format
(superset of Markdown). All text must be hard-wrapped to 72 columns and
conform to the
[MongoDB Documentation Style Guide](https://docs.mongodb.com/manual/meta/style-guide/).

### Basic Style Guidelines

* Capitalize the tutorial's title and headings according to the rules
  defined in the *The Chicago Manual of Style.* 
* Single space after terminal punctuation, such as periods.
* Do not use first person narrative, e.g., "I will backup..." or
  "We will backup...".
* Imply second person using the imperative, as in "Before initiating a
  backup, lock the database." Use the second person if needed,
  "If you need to backup..."
* Use imperative mood when necessary. For example, "Back up your
  databases often to prevent data loss."
* Avoid using "How to" in titles and headers. Gerunds are permitted in
  tutorial titles and may assist with this. For example, use "Connecting
  to MongoDB" instead of "How to Connect to MongoDB."
* Use **bold** to show emphasis but only when needed. For example,
  "Your application **must** ensure a unique `_id` to prevent errors."

### Creating a New Tutorial

To create a new tutorial run `hugo new <filename>`. Follow the file
naming conventions in the following section.
  
    hugo new connecting-to-mongodb-python.md

### File Naming Conventions

* All files should have a `.md` extension.
* Use hyphens (`-`) to separate words in filenames.
* Use the full title of the tutorial as the file name. For tutorials
  available in different languages or products use a similar filename
  with the language or product name appended before the file extension.
  For example: "connecting-to-mongodb-shell.md",
  "connecting-to-mongodb-python.md", etc...
* Use all lowercase letters in the filename.

### Tutorial Structure

Use the following tutorial outline whenever possible:

* **Introduction** - Provide a brief overview of the content and goals
  of the tutorial.
* **Prerequisites** - Include a list of any required software installations,
  configurations, or procedures that need to be completed
  before beginning this tutorial. Link to other tutorials here if
  possible.
* Insert the tutorial's first heading here. Start with "h2" level
  headings and use nested headings ("h3", "h4", etc.) as required by
  the tutorial content. 
  * There should be at least two headings at every nested level, e.g.,
    an "h2" should never have a single "h3", it will either have two or
    more "h3" headings or no nested headings.
* **Next Steps** - Include links to subsequent or other related
  tutorials.
* **References** - Include links to reference content in the MongoDB
  Server Manual, product specific documentation, or API documentation.

### Code Examples

* Start a code block using three tildes followed by the language.
  Terminate the code block using three tildes. For example:
  
      ~~~python
      import os
      ~~~
  
* Use single backticks \` to monospace commands or code inline with
  text, e.g., "Run the `mongo` command to start the mongo shell with the
  default parameters."
* Use single backticks \` for parameters or options.
* Place spaces between nested parentheticals and elements in
  JavaScript examples. For example, prefer ``{ [ a, b, c ] }`` over
  ``{[a,b,c]}``.

### Linking 
* For non-object references (i.e. functions, operators, methods,
  database commands, settings) always reference only the first
  occurrence of the reference in a section.
* Use hyperlinks to point readers to supplemental content that may not
  covered in entirety in the tutorial. This helps keep the tutorial
  focused while covering any knowledge gaps readers may have.
