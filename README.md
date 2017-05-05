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

### Tagging Tutorials
* Tag tutorials with the appropriate product, language (driver or
  shell), topics, and difficulty tags. Add tags to tutorial pages by
  including a `tags` array containing the string identifiers of each tag
  in the tutorial page's headmatter. Tag identifiers, display names, and
  facet group (e.g., language, product, etc.) are stored in the
  `config.toml` in the following format:
  
  ~~~
  [tags]
    [tags.mongodb] # Format is [tags.id], mongodb is the tag ID
    name = "MongoDB"
    facet = "product"
    
    [tags.administration] # administration is the tag ID
    name = "Administration"
    facet = "topic"
    
    # Additional tags would go here...
  ~~~
  
  The following example adds the "MongoDB", "Administration",
  "Replication", and "Beginner" tags to the "Deploy a Replica Set"
  tutorial:
  
  ~~~
  +++
  title = "Deploy a Replica Set"

  tags = [ "mongodb", "administration", "replication", "beginner" ]
  +++
  ~~~
  
* Consider the tutorial's audience when tagging the difficulty level.
  See the following suggested difficulty levels based on certain topics:
  * **Beginner** - Installing and connecting to MongoDB, configuring a
    replica set, CRUD, and other topics geared towards new MongoDB users.
  * **Intermediate** - Basic security and encryption (e.g., AUTH, SCRAM-SHA1,
    x.509, TLS/SSL, managing users and roles), deploying a sharded cluster
    and other topics geared towards experienced MongoDB users.
  * **Advanced** - Sharding (anything beyond deploying a sharded cluster),
    enterprise security (LDAP, Kerberos, and Active Directory),
    upgrade/downgrade proceedures and other topics geared towards highly
    experienced DBAs and developers in an enterprise setting or a setting
    with a large MongoDB deployment.
* New tags must be added to the `config.toml` file. Tag identifiers must
  be all lowercase with dashes '-' denoting spaces.