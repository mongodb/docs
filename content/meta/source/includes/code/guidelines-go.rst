Code Style Guidelines
---------------------

This section describes conventions for writing Go code examples in
documentation. The goal is to keep examples readable, idiomatic, and easy
for readers to adapt while avoiding unnecessary complexity.

See `Effective Go <https://go.dev/doc/effective_go>`__ and the
`Go Code Review Comments <https://go.dev/wiki/CodeReviewComments>`__ for
additional guidance.

Assumptions and Compatibility
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Target a supported Go version (currently Go 1.21 or later) unless a procedure or
  compatibility note requires an older version.
- Avoid deprecated patterns, such as the legacy ``mongo.Connect()`` that
  requires a ``context.Context`` parameter (removed in Go driver v2.0+).
- Avoid third-party libraries unless the page is explicitly about
  that library (for example, a web framework tutorial).

BSON Documents and Structs
~~~~~~~~~~~~~~~~~~~~~~~~~~

The MongoDB Go driver supports defining BSON documents as structs, or the document
types ``bson.D`` and ``bson.M``. In most cases, you should use a struct, but there
are cases where ``bson.D`` and ``bson.M`` are helpful. Use the following conventions
to choose the appropriate type.

Structs for Document Arguments
##############################

Use structs for document arguments passed to the driver. Most Go developers
use structs to work with data, and the Go driver supports using structs to
marshal and unmarshal documents.

.. code-block:: go

   type User struct {
       Name string `bson:"name"`
       Age  int    `bson:"age"`
   }

   user := User{Name: "Alice", Age: 30}
   _, err := collection.InsertOne(context.TODO(), user)

When introducing structs, show the struct definition and explain
the ``bson`` struct tags:

.. code-block:: go

   type Restaurant struct {
       ID       primitive.ObjectID `bson:"_id,omitempty"`
       Name     string             `bson:"name"`
       Cuisine  string             `bson:"cuisine"`
       Borough  string             `bson:"borough,omitempty"`
   }

``bson.D`` for Non-Document Arguments
#####################################

Use ``bson.D`` for non-document arguments passed to the driver, such as
filters, projections, sort specifications, and update operators. Key order
matters in some inputs (sort, hint, etc.), and the Go driver explicitly
prohibits a ``bson.M`` with multiple keys as an argument in some cases.

.. code-block:: go

   filter := bson.D{{"name", "Alice"}, {"age", bson.D{{"$gte", 21}}}}
   cursor, err := collection.Find(context.TODO(), filter)

``bson.M`` for Simple Cases
###########################

Use ``bson.M`` (unordered map) *only* for simple cases where
there is a single key:

.. code-block:: go

   filter := bson.M{"name": "Alice"}
   result, err := collection.FindOne(context.TODO(), filter).Decode(&doc)

Code Comments
~~~~~~~~~~~~~

Comments help clarify the intent of the code and help readers better understand it.

- Use code comments to explain or call out important details, including:

  - Non-obvious logic or intent. *Don't* restate the code.

    .. tip::

       Rewrite your code to avoid trivial comments. For example,
       meaningful and self-explanatory naming is better than a comment.

  - Omitted or truncated code sections. If you need to omit code, use a
    comment to indicate what is missing and why. See :ref:`truncations-and-omissions-go`.

- Use short, inline comments within one line of 60-80 characters when possible.
- Put comments on separate lines *before* the code they're commenting on.

Inline
######

In general, use single-line inline comments to comment your code when possible.
Inline comments provide small bits of information without disrupting the code's flow.

- Keep the comment on the line above the code it's commenting on.
- Avoid inline comments on the same line as the code they're commenting on.

.. code-block:: go

   // PREFERRED: Put your inline comment on the line above the code it's commenting on.
   x := 5;

   y := 10; // AVOID: Don't put your inline comment on the same line as the code.


Multi-line
##########

Use consecutive single-line comments when an explanation or description
exceeds one line. For example, you might need to describe the overall
purpose of a long code section or some especially complex logic.

.. code-block:: go

   // This is a longer comment that spans multiple lines.
   // Each line starts with the comment prefix.
   // Use consecutive single-line comments rather than block comments.
   y := 10

.. tip::

   Go conventionally uses consecutive single-line comments rather than
   block comments for longer explanations.

Doc Comments
############

Include `doc comments <https://go.dev/doc/comment>`__ when the example
is teaching an API or design pattern that benefits from it, such as in a sample app.

.. code-block:: go

   // InsertUser inserts a user document into the users collection.
   // It returns the inserted document's ID or an error if the insert fails.
   func InsertUser(coll *mongo.Collection, user User) (interface{}, error) {
       // ...
   }

Code Block Height
~~~~~~~~~~~~~~~~~

- Ideally, most code examples should be short, around 15-25 lines. However, they
  can exceed this height if needed to accomplish the intended purpose.
- If a code block is too long to comfortably display on a single screen, consider:

  - Breaking it into multiple blocks.
  - Hiding non-essential parts of the code. See :ref:`truncations-and-omissions-go`.
  - Using emphasis to draw attention to the most important parts of the code.
    See :ref:`code-example-formatting-emphasis`.

- Avoid trailing whitespace.

Conditional Logic
~~~~~~~~~~~~~~~~~

- Keep conditional logic (or "control flow") shallow and easy to follow:

  .. code-block:: go

     if len(documents) > 0 {
         _, err := collection.InsertMany(context.TODO(), documents)
         if err != nil {
             panic(err)
         }
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
  ``emphasize-lines`` to highlight the line), and readers can
  easily understand how to configure them (for example, use comments to
  explain what the variable represents).
  See also :ref:`placeholders-go`.

Context Usage
~~~~~~~~~~~~~

- Use ``context.TODO()`` inline when calling functions and methods that accept
  a context:

  .. code-block:: go

     result, err := collection.InsertOne(context.TODO(), doc)

- As of Go driver v2.0, ``mongo.Connect()`` no longer requires a
  context parameter:

  .. code-block:: go

     client, err := mongo.Connect(options.Client().ApplyURI(uri))

- For production-like examples or timeout demonstrations, show proper
  context creation:

  .. code-block:: go

     ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
     defer cancel()

     result, err := collection.InsertOne(ctx, doc)

Session Contexts
################

When writing examples that use sessions, always use the variable name ``ctx``
for the ``mongo.SessionContext`` parameter in session callbacks. This
deliberately shadows the outer ``ctx`` variable, making it impossible to
accidentally reference the wrong context inside the callback:

.. code-block:: go

   // Outer context
   ctx := context.TODO()

   mongo.WithSession(
       ctx,
       sess,
       func(ctx mongo.SessionContext) error {
           // This 'ctx' shadows the outer 'ctx'
           // All operations here automatically use the session context
           _, err := coll.InsertOne(ctx, bson.D{{"x", 1}})
           return err
       })

Error Handling
~~~~~~~~~~~~~~

- Show realistic error handling. In Go, always check returned errors:

  .. code-block:: go

     _, err := collection.InsertOne(context.TODO(), doc)
     if err != nil {
         panic(err)
     }

- Avoid ignoring errors with ``_`` unless you explicitly explain why.
- Use ``panic(err)`` in example ``main()`` functions to exit with an error
  message. This is preferred over ``log.Fatal(err)`` because it provides
  a stack trace that helps with debugging.
- For more complete examples, consider returning errors and using ``log.Printf``.
- Use sentinel errors and error checking when demonstrating specific error handling:

  .. code-block:: go

     err := coll.FindOne(context.TODO(), filter).Decode(&result)
     if err == mongo.ErrNoDocuments {
         fmt.Println("No document found")
         return
     }
     if err != nil {
         panic(err)
     }

File and Function Structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Use small, single-purpose example packages when possible.
- Put the main example code in a ``main()`` function.
- Declare the MongoDB URI first in ``main()`` using an environment variable:

  .. code-block:: go

     package main

     import (
         "os"

         "go.mongodb.org/mongo-driver/v2/mongo"
         "go.mongodb.org/mongo-driver/v2/mongo/options"
     )

     func main() {
         uri := os.Getenv("MONGODB_URI")
         if uri == "" {
             uri = "mongodb://localhost:27017"
         }

         client, err := mongo.Connect(options.Client().ApplyURI(uri))
         if err != nil {
             panic(err)
         }
         // ...
     }

- For full usage examples, include enough surrounding context to make the snippet
  compile (imports, type definitions, etc.).
- Keep example functions focused. If a function grows beyond roughly 25-30
  lines, consider splitting the workflow into multiple sections.

Generic Types and Type Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Specify types explicitly when they improve clarity:

  .. code-block:: go

     var result Restaurant
     err := collection.FindOne(ctx, filter).Decode(&result)

  or when using ``bson.M`` for flexible results:

  .. code-block:: go

     var result bson.M
     err := collection.FindOne(ctx, filter).Decode(&result)

- Avoid using ``interface{}`` or ``any`` unless the example specifically
  demonstrates dynamic typing.
- When a method returns a result, show the type explicitly in
  the variable declaration to help readers understand the return type:

  .. code-block:: go

     cursor, err := collection.Find(ctx, filter)
     // cursor is of type *mongo.Cursor

Imports
~~~~~~~

- Group imports in the standard Go format:

  1. Standard library imports.
  2. Third-party imports (including the MongoDB driver).

- Use the ``goimports`` or ``gofmt`` format for import blocks:

  .. code-block:: go

     import (
         "context"
         "fmt"
         "log"

         "go.mongodb.org/mongo-driver/v2/bson"
         "go.mongodb.org/mongo-driver/v2/mongo"
         "go.mongodb.org/mongo-driver/v2/mongo/options"
     )

- Include *all* imports used in the example at the top of the code block,
  or when applicable, define them in a setup section or procedure step.
- Avoid dot imports (``import . "package"``).
- Avoid aliasing imports unless necessary to resolve conflicts.

.. _line-breaks-go:

Line Length and Breaks
~~~~~~~~~~~~~~~~~~~~~~

- Keep lines under 80 characters when possible.
- Break long lines at natural breaking points for readability, but not at the expense of
  Go best practices:

  .. code-block:: go

     client, err := mongo.Connect(
         options.Client().ApplyURI(uri),
     )

- For chained method calls, break onto separate lines:

  .. code-block:: go

     opts := options.Find().
         SetSort(bson.D{{"age", -1}}).
         SetLimit(10)

Logging and Output
~~~~~~~~~~~~~~~~~~

- Use ``fmt.Println`` and ``fmt.Printf`` in short examples
  to show output clearly.
- Use ``log.Fatal``, ``log.Printf``, or ``log.Println`` for error logging
  and application messages.
- Avoid introducing complex logging frameworks unless
  required by the topic or example type (for example, a sample app).

Naming Conventions
~~~~~~~~~~~~~~~~~~

- Favor descriptive names such as ``client``, ``db``, ``coll``,
  ``filter``, and ``result``.
- Avoid placeholder names such as ``foo``, ``bar``, ``tmp``, or overly
  domain-specific names that distract from the example's purpose.
- Use standard Go casing:

  .. list-table::
     :header-rows: 1
     :widths: 20 30 50

     * - Element
       - Casing Convention
       - Example

     * - Exported functions, types, constants
       - PascalCase
       - ``InsertOne``, ``MongoClient``, ``MaxPoolSize``

     * - Unexported functions, variables
       - camelCase
       - ``client``, ``insertDoc``, ``handleError``

     * - Acronyms
       - Consistent casing
       - ``userID`` (not ``UserId``), ``httpClient``

     * - Package names
       - lowercase, single word
       - ``mongo``, ``bson``, ``options``

.. _placeholders-go:

Placeholders
~~~~~~~~~~~~

- Use placeholders sparingly, such as for credentials, connection strings,
  or other values that are not essential to the example.
- Always include a comment above the line with the placeholder to explain what it
  represents.
- Highlight the line with the placeholder using ``:emphasize-lines:``.
- Ensure that any placeholder text in code is obvious. Format placeholders
  as directed in :ref:`api-placeholders`.

.. code-block:: go
   :emphasize-lines: 1-2

   // Replace the placeholder with your MongoDB deployment's connection string
   uri := "<your connection string>"

   client, err := mongo.Connect(options.Client().ApplyURI(uri))
   // ...

Resource Management
~~~~~~~~~~~~~~~~~~~

- Use ``defer`` to ensure the client disconnects when the function returns:

  .. code-block:: go

     client, err := mongo.Connect(options.Client().ApplyURI(uri))
     if err != nil {
         panic(err)
     }
     defer func() {
         if err := client.Disconnect(context.TODO()); err != nil {
             panic(err)
         }
     }()

- In short, self-contained examples where lifecycle management isn't the focus,
  you can omit the ``defer`` and add a comment noting that the client
  should be closed in production:

  .. code-block:: go

     client, err := mongo.Connect(options.Client().ApplyURI(uri))
     if err != nil {
         panic(err)
     }
     // ... example code ...

     // Close the client when finished (typically with defer)

- For cursor iteration, close the cursor when done:

  .. code-block:: go

     cursor, err := collection.Find(context.TODO(), filter)
     if err != nil {
         panic(err)
     }
     defer cursor.Close(context.TODO())

     for cursor.Next(context.TODO()) {
         var result bson.M
         if err := cursor.Decode(&result); err != nil {
             panic(err)
         }
         fmt.Println(result)
     }

.. _indentation-go:

Tabs, Spaces, and Indentation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Use tabs for indentation (Go's standard formatting).
- Run ``gofmt`` or ``goimports`` to format code consistently.
- Place opening braces on the same line as declarations:

  .. code-block:: go

     func insertDoc() {
         // ...
     }

- Keep code aligned and easy to scan:

  .. code-block:: go

     opts := options.Client().
         ApplyURI(uri).
         SetMaxPoolSize(50).
         SetMinPoolSize(10)

Aggregation Pipelines
#####################

- When building aggregation pipelines, align stages vertically for
  readability:

  .. code-block:: go

     pipeline := mongo.Pipeline{
         {{"$match", bson.D{{"status", "active"}}}},
         {{"$sort", bson.D{{"createdAt", -1}}}},
         {{"$limit", 10}},
     }

Options Patterns
################

- Place each option setter on its own line for readability:

  .. code-block:: go

     findOpts := options.Find().
         SetSort(bson.D{{"age", -1}}).
         SetLimit(10).
         SetProjection(bson.D{{"name", 1}, {"age", 1}})

- For client options, chain methods clearly:

  .. code-block:: go

     clientOpts := options.Client().
         ApplyURI(uri).
         SetMaxPoolSize(100).
         SetRetryWrites(true)

Testing Examples
~~~~~~~~~~~~~~~~

- Use the Grove platform to write and test your Go code examples.
  See :ref:`grove-platform` for more information.
- Use table-driven tests when demonstrating multiple cases:

  .. code-block:: go

     func TestInsert(t *testing.T) {
         // ... setup ...
         if insertResult == nil {
             t.Fatal("expected insert result, got nil")
         }
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

.. _truncations-and-omissions-go:

Truncations and Omissions
~~~~~~~~~~~~~~~~~~~~~~~~~

-  Use a commented ellipsis (``...``) to denote where code has been
   deliberately omitted or truncated in an example.

   .. code-block:: go

      _, err := collection.InsertOne(ctx, doc)
      if err != nil {
          // ... handle error
      }

.. important::

   Always include an explanation comment when the ellipsis appears in a
   docs-facing code example (as opposed to tests).