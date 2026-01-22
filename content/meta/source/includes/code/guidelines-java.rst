Code Style Guidelines
---------------------

This section describes conventions for writing Java code examples in
documentation. The goal is to keep examples readable, idiomatic, and easy
for readers to adapt while avoiding unnecessary complexity.

See the `Google Java Style Guide <https://google.github.io/styleguide/javaguide.html>`__
for additional guidance.

Assumptions and Compatibility
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Target a modern LTS (long-term support) release (currently Java 21) unless a procedure or
  compatibility note requires an older version.
- Avoid preview or incubation features in code examples.
- Avoid framework-specific patterns unless the page is explicitly about
  that framework (for example, a Spring Data tutorial).
- Avoid deprecated patterns.

Code Comments
~~~~~~~~~~~~~

Comments help clarify the intent of the code and help readers better understand it.

- Use code comments to explain or call out important details, including:

  - Non-obvious logic or intent. *Don't* restate the code.

    .. tip::

       Rewrite your code to avoid trivial comments. For example,
       meaningful and self-explanatory naming is better than a comment.

  - Omitted or truncated code sections. If you need to omit code, use a
    comment to indicate what is missing and why. See :ref:`truncations-and-omissions-java`.

- Use short, inline comments within one line of 60-80 characters when possible.
- Put comments on separate lines *before* the code they're commenting on.

Inline
######

In general, use single-line inline comments to comment your code when possible.
Inline comments provide small bits of information without disrupting the code's flow.

.. code-block:: java

    // This is an inline comment.
    int x = 5;

Multi-line
##########

Use multi-line comments (sometimes called "block comments") when an
explanation or description can't be reduced to one or two lines.
For example, you might need to use multi-line comments to describe the
overall purpose of a long code section or some especially complex logic.

.. code-block:: java

   /* This is a multi-line comment.
    * It can span multiple lines and provides a more detailed explanation.
    */
    int y = 10;

Javadoc
#######

Include only `Javadoc <https://en.wikipedia.org/wiki/Javadoc>`__ when the example
is teaching an API or design pattern that benefits from it, such as in a sample app.

.. code-block:: java

    /**
     * This is a Javadoc comment. It uses specific syntax and conventions.
     * It provides detailed information about the class, method, or field.
     */
    public class MyClass {
        // ...
    }

Conditional Logic
~~~~~~~~~~~~~~~~~

- Keep conditional logic (or "control flow") shallow and easy to follow:

  .. code-block:: java

    if (!documents.isEmpty()) {
        collection.insertMany(documents);
    }

- Avoid deeply nested ``if``/``else`` blocks or multi-level loops in short
  examples.
- Use early returns when they simplify the example logic.

Configurable Fields
~~~~~~~~~~~~~~~~~~~

- Define variables for fields that are configurable by the user, such as connection
  strings, database names, and collection names.
- For procedures, introduce variables in either a setup section or as an explicit step
  when the variable is first used.
- Ensure that the variable placeholders are obvious (for example, use
  `emphasize-lines` to highlight the line), and readers can
  easily understand how to configure them (for example, use comments to
  explain what the variable represents).
  See also :ref:`placeholders-java`.

Code Block Height
~~~~~~~~~~~~~~~~~

- Ideally, most code examples should be short, around 15-25 lines. However, they
  can exceed this height if needed to accomplish the intended purpose.
- If a code block is too long to comfortably display on a single screen, consider:

  - Breaking it into multiple blocks.
  - Hiding non-essential parts of the code. See :ref:`truncations-and-omissions-java`.
  - Using emphasis to draw attention to the most important parts of the code.
    See :ref:`code-example-formatting-emphasis`.

- Avoid trailing whitespace.

Error Handling
~~~~~~~~~~~~~~

- Show realistic error handling without unnecessary verbosity.
- Use specific exceptions when possible:

  .. code-block:: java

     try {
        collection.insertOne(doc);
     } catch (MongoException e) {
        System.err.println("Insert failed: " + e.getMessage());
     }

- Avoid empty ``catch`` blocks.

File, Class, and Method Structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Use small, single-purpose example classes when possible.
- Use one top-level class per example file:

  .. code-block:: java

    public class InsertOneExample {
        public static void main(String[] args) throws Exception {
            // ...
        }
    }

- For full usage examples, include enough surrounding context to make the snippet
  compile (imports, type definitions, etc.).
- Keep example methods focused. If a method grows beyond roughly 25-30
  lines, consider splitting the workflow into multiple sections.

Generic Documents and POJOs
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The MongoDB Java driver supports both the generic ``Document`` API and
type-safe POJOs (Plain Old Java Objects). Choose the approach that best
fits the example's purpose.

Document API
############

Use the Document API for:

- Quick-start examples and simple operations.
- Dynamic or schema-less data.
- Examples focused on query syntax rather than data modeling:

  .. code-block:: java

    Document doc = new Document("name", "Alice").append("age", 30);
    collection.insertOne(doc);

POJOs
#####

Use POJOs for:

- Examples demonstrating data modeling or object mapping.
- Tutorials and sample applications with defined schemas.
- Examples where type safety improves clarity:

  .. code-block:: java

    User user = new User("Alice", 30);
    collection.insertOne(user);

- When introducing POJOs, show the codec registry setup or point to
  documentation on POJO configuration:

  .. code-block:: java

    CodecProvider pojoCodecProvider = PojoCodecProvider.builder()
        .automatic(true)
        .build();
    CodecRegistry pojoCodecRegistry = fromRegistries(
        getDefaultCodecRegistry(),
        fromProviders(pojoCodecProvider));

    MongoDatabase database = mongoClient
        .getDatabase("sample_db")
        .withCodecRegistry(pojoCodecRegistry);

.. tip::

   Consider showing both approaches when the page serves readers with
   different needs, using tabs or separate sections.

Imports
~~~~~~~

- When possible, do not use wildcard imports.
- Avoid static imports except with builders. See also :ref:`static-imports-java`.
- Include *all* imports used in the example at the top of the code block,
  or when applicable, define them in a setup section or procedure step.
- Group imports in this order:

  1. ``java`` and ``javax`` imports.
  2. Third-party libraries.
  3. Project-specific packages.

.. _static-imports-java:

Static Imports for Builders
###########################

- Use static imports for builder methods *only* when they improve readability *and* the
  example uses builders extensively.
- When using static imports, group them separately after regular imports:

  .. code-block:: java

     import com.mongodb.client.MongoClient;
     import com.mongodb.client.MongoCollection;
     import org.bson.Document;

     import static com.mongodb.client.model.Filters.eq;
     import static com.mongodb.client.model.Filters.gte;

- Static imports work well when the method name is self-explanatory:

  .. code-block:: java

     // Clear and readable with static import
     collection.find(and(eq("status", "active"), gte("age", 21)));

- Avoid static imports in short examples or when introducing builders for the
  first time. Use fully qualified calls to help readers understand the source:

  .. code-block:: java

     // Explicit form for introductory examples
     Bson filter = Filters.eq("status", "active");
     collection.find(filter);

- Do not mix static and non-static builder calls in the same example.

.. _line-breaks-java:

Line Length and Breaks
~~~~~~~~~~~~~~~~~~~~~~

- Break long lines at natural breaking points for the sake of readability,
  but not at the expense of Java best practices.
- Break long chained calls onto separate lines aligned under the first call.
  See also the :ref:`indentation-java` section.

Logging and Output
~~~~~~~~~~~~~~~~~~

- Use ``System.out.println`` and ``System.err.println`` in short examples
  to show output clearly.
- When demonstrating realistic application patterns, use a logger with a
  minimal configuration. Avoid introducing complex logging frameworks unless
  required by the topic or example type (for example, a sample app).

Naming Conventions
~~~~~~~~~~~~~~~~~~

- Favor descriptive names such as ``mongoClient``, ``database``,
  ``collection``, ``filter``, and ``result``.
- Avoid placeholder names such as ``foo``, ``bar``, ``tmp``, or overly
  domain-specific names that distract from the example's purpose.
- Use standard Java casing:

  .. list-table::
     :header-rows: 1
     :widths: 20 30 50

     * - Element
       - Casing Convention
       - Example

     * - Classes
       - PascalCase
       - ``InsertOneExample``, ``MongoClientSettings``

     * - Methods
       - camelCase
       - ``insertOne()``, ``getCollection()``

     * - Variables
       - camelCase
       - ``mongoClient``, ``database``, ``collection``

     * - Constants
       - UPPER_SNAKE_CASE
       - ``MAX_POOL_SIZE``, ``DEFAULT_TIMEOUT``

     * - Package names
       - lowercase
       - ``com.example.docs``, ``com.mongodb.docs.quickstart``

.. _placeholders-java:

Placeholders
~~~~~~~~~~~~

- Use placeholders sparingly, such as for credentials, connection strings,
  or other values that are not essential to the example.
- Always include a comment above the line with the placeholder to explain what it
  represents.
- Highlight the line with the placeholder using ``:emphasize-lines:``.
- Ensure that any placeholder text in code is obvious. Format placeholders
  as directed in :ref:`api-placeholders`.

.. code-block:: java
   :emphasize-lines: 1-2

   // Replace the placeholder with your MongoDB deployment's connection string
   String uri = "<your connection string>";

   MongoClient mongoClient = MongoClients.create(uri);
   // ...

Resource Management
~~~~~~~~~~~~~~~~~~~

- Use try-with-resources for ``MongoClient`` and other ``Closeable`` resources
  to ensure proper cleanup:

  .. code-block:: java

     try (MongoClient mongoClient = MongoClients.create(uri)) {
         MongoDatabase database = mongoClient.getDatabase("sample_db");
         // perform operations
     }

- In short, self-contained examples where lifecycle management isn't the focus,
  you can omit try-with-resources and add a comment noting that the client
  should be closed in production:

  .. code-block:: java

     MongoClient mongoClient = MongoClients.create(uri);
     // ... example code ...

     // Close the client when finished (typically in a try-with-resources block)

- For cursor iteration, use try-with-resources when you manually manage the
  cursor:

  .. code-block:: java

     try (MongoCursor<Document> cursor = collection.find().cursor()) {
         while (cursor.hasNext()) {
             System.out.println(cursor.next().toJson());
         }
     }

.. _indentation-java:

Tabs, Spaces, and Indentation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Indent with 4 spaces, *not* tabs.
- Place opening braces on the same line as declarations:

  .. code-block:: java

     public void insert() {
         // ...
     }

- Insert a single space after ``if``, ``for``, ``while``, and around binary
  operators.
- Keep chains vertically aligned and easy to scan:

  .. code-block:: java

     MongoClientSettings settings = MongoClientSettings.builder()
         .applyConnectionString(connectionString)
         .retryWrites(true)
         .build();

  See also the :ref:`line-breaks-java` section.

Aggregation Pipelines
#####################

- When building aggregation pipelines, align stages vertically for
  readability:

  .. code-block:: java

     List<Bson> pipeline = List.of(
         Aggregates.match(Filters.eq("status", "active")),
         Aggregates.sort(Sorts.descending("createdAt")),
         Aggregates.limit(10)
     );

Builder Patterns
################

- Place each builder method on its own line, indented one level:

  .. code-block:: java

     MongoClientSettings settings = MongoClientSettings.builder()
         .applyConnectionString(connectionString)
         .retryWrites(true)
         .retryReads(true)
         .build();

- Align ``.build()`` with other builder methods, not with the variable
  declaration.

- For nested builders, use a lambda and indent the nested builder's methods:

  .. code-block:: java
     :emphasize-lines: 3-8

     MongoClientSettings settings = MongoClientSettings.builder()
         .applyConnectionString(connectionString)
         .applyToConnectionPoolSettings(builder -> builder
             .maxSize(50)
             .minSize(10)
             .maxConnectionIdleTime(30, TimeUnit.SECONDS))
         .applyToSocketSettings(builder -> builder
             .connectTimeout(10, TimeUnit.SECONDS))
         .build();

- When combining multiple builder results, put
  each element on its own line:

  .. code-block:: java

     Bson updates = Updates.combine(
         Updates.set("status", "active"),
         Updates.inc("loginCount", 1),
         Updates.currentDate("lastLogin")
     );

     Bson filter = Filters.and(
         Filters.eq("status", "active"),
         Filters.gte("age", 21),
         Filters.exists("email")
     );

Testing Examples
~~~~~~~~~~~~~~~~

- Use the Grove platform to write and test your Java code examples.
  See :ref:`grove-platform` for more information.
- Use descriptive test names and simple assertions when possible:

  .. code-block:: java

     @Test
     void insertsDocumentSuccessfully() {
        assertEquals(1, collection.countDocuments());
     }

- When possible, use the Grove Comparison API to verify output. See
  :ref:`grove-add-tests` for more information.
- Keep test setup minimal and focused on the behavior being demonstrated.
- Test every code example to ensure it works as intended:

  - When writing or reviewing, run the code that displays on the page.
  - For tutorials or multi-step examples, begin at the starting point and
    complete all steps exactly, including any prerequisites or setup. Don't
    skip steps, or assume they're correct or comprehensive.
  - If you have to make changes or take additional steps to get an example to
    work, make sure those changes are reflected in the documentation.

.. note::

   For any questions or for help writing or testing code examples, reach
   out to the DevDocs team or use the ``#ask-devdocs`` Slack channel.

.. _truncations-and-omissions-java:

Truncations and Omissions
~~~~~~~~~~~~~~~~~~~~~~~~~

-  Use a commented ellipsis (``...``) to denote where code has been
   deliberately omitted or truncated in an example.

   .. code-block:: java

      try {
          collection.insertOne(document);
          // ... omitted for brevity
      } catch (MongoException e) {
          System.err.println("Error: " + e.getMessage());
      }

.. important::

   Always include an explanation comment when the ellipsis appears in a
   docs-facing code example (as opposed to tests).

Typed Collections and Generics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Always specify the type parameter for ``MongoCollection``:

  .. code-block:: java

     MongoCollection<Document> collection = database.getCollection("users");

- When using POJOs, specify the POJO class:

  .. code-block:: java

     MongoCollection<User> collection = database.getCollection("users", User.class);

- Avoid raw types. Always include generic parameters:

  .. code-block:: java

     // Correct
     List<Document> documents = new ArrayList<>();

     // Avoid: raw type
     List documents = new ArrayList();

- When a method returns a generic result, show the type explicitly in
  the variable declaration (even if using ``var`` elsewhere) to help
  readers understand the return type:

  .. code-block:: java

     FindIterable<Document> results = collection.find(filter);

``var``
#######

- Use ``var`` when appropriate. Use it in short examples, and when the type
  is obvious from the right-hand side:

  .. code-block:: java

    var document = new Document("name", "Alice");
    var collection = database.getCollection("users");

- Avoid ``var`` when the type isn't immediately clear, especially with
  factory methods or complex generics:

  .. code-block:: java

     // Use explicit type - unclear what create() returns
     MongoClient mongoClient = MongoClients.create(uri);

     // Use explicit type - clarifies the collection's document type
     MongoCollection<Document> collection = database.getCollection("users");

- Avoid ``var`` in examples that teach type relationships or API structure,
  where seeing the explicit type helps readers understand the code.
- Be consistent within a single example: don't mix ``var`` and explicit types
  for similar declarations.