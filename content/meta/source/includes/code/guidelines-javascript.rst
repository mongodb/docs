Code Style Guidelines
---------------------

This section describes conventions for writing JavaScript code examples in
documentation. The goal is to keep examples readable, idiomatic, and easy
for readers to adapt while avoiding unnecessary complexity.

.. note:: Node JS Driver and Mongosh Shell

   These guidelines can apply to any code examples that use the JavaScript
   language, including
   Node.js driver and ``mongosh`` shell examples. We will note any
   important callouts for ``mongosh`` shell-specific guidance.

See the `MDN JavaScript Guide <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide>`__
and `Airbnb JavaScript Style Guide <https://github.com/airbnb/javascript>`__ for
additional guidance.

Assumptions and Compatibility
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Target a modern Node.js LTS (long-term support) version (currently Node.js 24 or later) unless a
  procedure or compatibility note requires an older version.
- Use ES modules (``import``/``export``) rather than CommonJS (``require``/``module.exports``)
  in new examples.

  .. note:: ES Modules Supported in ``mongosh`` >= v1.6.0

     The ``mongosh`` shell v1.6.0 and later support ECMAScript (ES) modules.
     In previous versions, ``mongosh`` requires the
     CommonJS ``require`` syntax.

- Avoid deprecated patterns and experimental features.
- Avoid framework-specific patterns unless the page is explicitly about
  that framework (for example, an Express.js tutorial).

Async/Await
~~~~~~~~~~~

- Use ``async``/``await`` for asynchronous operations. This is the standard
  pattern for MongoDB Node.js driver examples:

  .. code-block:: javascript

     async function run() {
       const result = await collection.insertOne(doc);
       console.log(result.insertedId);
     }

- Handle errors with ``try``/``finally`` blocks.
  Use ``try``/``catch``/``finally`` when demonstrating error handling:

  .. code-block:: javascript

     async function run() {
       try {
         const result = await collection.findOne(query);
         console.log(result);
       } finally {
         await client.close();
       }
     }

- Avoid ``.then()``/``.catch()`` chains.

Code Comments
~~~~~~~~~~~~~

Comments help clarify the intent of the code and help readers better understand it.

- Use code comments to explain or call out important details, including:

  - Non-obvious logic or intent. *Don't* restate the code.

    .. tip::

       Rewrite your code to avoid trivial comments. For example,
       meaningful and self-explanatory naming is better than a comment.

  - Omitted or truncated code sections. If you need to omit code, use a
    comment to indicate what is missing and why. See :ref:`truncations-and-omissions-js`.

- Use short, inline comments within one line of 60-80 characters when possible.
- Put comments on separate lines *before* the code they're commenting on.

Inline
######

In general, use single-line inline comments when possible.
Inline comments provide small bits of information without disrupting the code's flow.

- Keep the comment on the line above the code it's commenting on.
- Avoid inline comments on the same line as the code they're commenting on.

.. code-block:: javascript

   // PREFERRED: Put your inline comment on the line above the code it's commenting on.
   const x = 5;

   const y = 10; // AVOID: Don't put your inline comment on the same line as the code.

Multi-line
##########

Use multi-line comments when an explanation or description exceeds one line.
For example, you might need to describe the overall purpose of a long code
section or some especially complex logic.

.. code-block:: javascript

   /*
    * This is a multi-line comment.
    * It can span multiple lines and provides a more detailed explanation.
    */
   const y = 10;

JSDoc
#####

Include `JSDoc <https://jsdoc.app/>`__ comments when the example is teaching
an API or design pattern that benefits from it, such as in a sample app.

.. code-block:: javascript

   /**
    * Inserts a user document into the users collection.
    * @param {Collection} collection - The MongoDB collection.
    * @param {Object} user - The user document to insert.
    * @returns {Promise<InsertOneResult>} The result of the insert operation.
    */
   async function insertUser(collection, user) {
     return await collection.insertOne(user);
   }

Code Block Height
~~~~~~~~~~~~~~~~~

- Ideally, most code examples should be short, around 15-25 lines. However, they
  can exceed this height if needed to accomplish the intended purpose.
- If a code block is too long to comfortably display on a single screen, consider:

  - Breaking it into multiple blocks.
  - Hiding non-essential parts of the code. See :ref:`truncations-and-omissions-js`.
  - Using emphasis to draw attention to the most important parts of the code.
    See :ref:`code-example-formatting-emphasis`.

- Avoid trailing whitespace.

Conditional Logic
~~~~~~~~~~~~~~~~~

- Keep conditional logic (or "control flow") shallow and easy to follow:

  .. code-block:: javascript

     if (documents.length > 0) {
       const result = await collection.insertMany(documents);
       console.log(`Inserted ${result.insertedCount} documents`);
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
  See also :ref:`placeholders-js`.

Documents and Objects
~~~~~~~~~~~~~~~~~~~~~

The MongoDB Node.js driver works with JavaScript objects as documents. Use the
following conventions when working with documents:

- Use plain JavaScript objects for most document operations:

  .. code-block:: javascript

     const doc = {
       name: "Alice",
       age: 30,
       email: "alice@example.com",
     };
     const result = await collection.insertOne(doc);

- When you need to specify BSON types explicitly, import them from the driver:

  .. code-block:: javascript

     import { ObjectId, Decimal128 } from "mongodb";

     const doc = {
       _id: new ObjectId(),
       price: Decimal128.fromString("19.99"),
     };

- For query filters and update operations, use object literals:

  .. code-block:: javascript

     // Filter
     const filter = { status: "active", age: { $gte: 21 } };

     // Update
     const update = { $set: { verified: true } };

     const result = await collection.updateOne(filter, update);

Error Handling
~~~~~~~~~~~~~~

- Show realistic error handling. Use ``try``/``catch``/``finally`` blocks:

  .. code-block:: javascript

     async function run() {
       try {
         const result = await collection.insertOne(doc);
         console.log(result.insertedId);
       } catch (error) {
         console.error("Insert failed:", error.message);
       } finally {
         await client.close();
       }
     }

- In short examples where error handling isn't the focus, use ``try``/``finally``
  and handle errors at the call site:

  .. code-block:: javascript

     async function run() {
       try {
         const movie = await movies.findOne(query);
         console.log(movie);
       } finally {
         await client.close();
       }
     }
     // Handle errors from run()
     run().catch(console.dir);

- Avoid empty ``catch`` blocks.

File and Function Structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Use small, single-purpose example files when possible.
- Wrap the main example code in an ``async`` function:

  .. code-block:: javascript

     import { MongoClient } from "mongodb";

     // Replace with your connection string
     const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
     const client = new MongoClient(uri);

     async function run() {
       try {
         const database = client.db("sample_db");
         const collection = database.collection("users");
         // ... example code ...
       } finally {
         await client.close();
       }
     }
     run().catch(console.dir);

- For full usage examples, include enough surrounding context to make the snippet
  run (imports, client setup, etc.).
- Keep example functions focused. If a function grows beyond roughly 25-30
  lines, consider splitting the workflow into multiple sections.

Imports
~~~~~~~

- Use ES module syntax (``import``/``export``):

  .. code-block:: javascript

     import { MongoClient } from "mongodb";

- Group imports in this order:

  1. Node.js built-in modules.
  2. Third-party modules (including the MongoDB driver).
  3. Local modules.

- Avoid wildcard imports when possible. Import only what you need:

  .. code-block:: javascript

     // Preferred
     import { MongoClient, ObjectId } from "mongodb";

     // Avoid
     import * as mongodb from "mongodb";

.. _line-breaks-js:

Line Length and Breaks
~~~~~~~~~~~~~~~~~~~~~~

- Keep lines under 80 characters when possible.
- Break long lines at natural breaking points for readability:

  .. code-block:: javascript

     const client = new MongoClient(uri, {
       maxPoolSize: 50,
       minPoolSize: 10,
     });

- For chained method calls, break onto separate lines:

  .. code-block:: javascript

     const cursor = collection
       .find(query)
       .sort({ createdAt: -1 })
       .limit(10);

Logging and Output
~~~~~~~~~~~~~~~~~~

- Use ``console.log`` and ``console.error`` in short examples to show output
  clearly.
- Use ``console.dir`` for displaying objects with nested properties:

  .. code-block:: javascript

     console.dir(result, { depth: null });

- Avoid introducing complex logging frameworks unless required by the topic
  or example type (for example, a sample app).

Naming Conventions
~~~~~~~~~~~~~~~~~~

- Favor descriptive names such as ``client``, ``database``, ``collection``,
  ``filter``, and ``result``.
- Avoid placeholder names such as ``foo``, ``bar``, ``tmp``, or overly
  domain-specific names that distract from the example's purpose.
- Use standard JavaScript casing:

  .. list-table::
     :header-rows: 1
     :widths: 20 30 50

     * - Element
       - Casing Convention
       - Example

     * - Variables and functions
       - camelCase
       - ``mongoClient``, ``insertOne``, ``findDocuments``

     * - Classes
       - PascalCase
       - ``MongoClient``, ``ObjectId``

     * - Constants
       - UPPER_SNAKE_CASE or camelCase
       - ``MAX_POOL_SIZE``, ``defaultTimeout``

     * - File names
       - kebab-case or camelCase
       - ``insert-one.js``, ``findDocuments.js``

.. _placeholders-js:

Placeholders
~~~~~~~~~~~~

- Use placeholders sparingly, such as for credentials, connection strings,
  or other values that are not essential to the example.
- Always include a comment above the line with the placeholder to explain what it
  represents.
- Highlight the line with the placeholder using ``:emphasize-lines:``.
- Ensure that any placeholder text in code is obvious. Format placeholders
  as directed in :ref:`api-placeholders`.

.. code-block:: javascript
   :emphasize-lines: 1-2

   // Replace the placeholder with your MongoDB deployment's connection string
   const uri = "<connection string uri>";

   const client = new MongoClient(uri);
   // ...

Quotes
~~~~~~

- Use single quotes for strings:

  .. code-block:: javascript

     const name = 'Alice';
     const query = { title: 'Back to the Future' };

- Use template literals (backticks) for string interpolation or multi-line
  strings:

  .. code-block:: javascript

     const message = `Inserted document with _id: ${result.insertedId}`;

Resource Management
~~~~~~~~~~~~~~~~~~~

- Always close the client connection when finished. Use ``try``/``finally``
  to ensure cleanup:

  .. code-block:: javascript

     async function run() {
       try {
         // ... operations ...
       } finally {
         await client.close();
       }
     }

- In short, self-contained examples where lifecycle management isn't the focus,
  you can add a comment noting that the client should be closed:

  .. code-block:: javascript

     const client = new MongoClient(uri);
     // ... example code ...

     // Close the client when finished (typically in a finally block)

- For cursor iteration, use ``for await...of`` which handles cleanup automatically:

  .. code-block:: javascript

     const cursor = collection.find(query);
     for await (const doc of cursor) {
       console.log(doc);
     }

.. _indentation-js:

Tabs, Spaces, and Indentation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Indent with 2 spaces (standard JavaScript convention).
- Place opening braces on the same line as declarations:

  .. code-block:: javascript

     async function insertDoc() {
       // ...
     }

- Use consistent spacing around operators and after commas.
- Keep code aligned and easy to scan:

  .. code-block:: javascript

     const options = {
       maxPoolSize: 50,
       minPoolSize: 10,
       retryWrites: true,
     };

Aggregation Pipelines
#####################

- When building aggregation pipelines, align stages vertically for
  readability:

  .. code-block:: javascript

     const pipeline = [
       { $match: { status: "active" } },
       { $sort: { createdAt: -1 } },
       { $limit: 10 },
     ];

     const cursor = collection.aggregate(pipeline);

Options Objects
###############

- Place each option on its own line for readability:

  .. code-block:: javascript

     const options = {
       sort: { rating: -1 },
       projection: { _id: 0, title: 1, rating: 1 },
       limit: 10,
     };

     const cursor = collection.find(query, options);

- For client options, structure clearly:

  .. code-block:: javascript

     const client = new MongoClient(uri, {
       maxPoolSize: 100,
       minPoolSize: 10,
       retryWrites: true,
       retryReads: true,
     });

Testing Examples
~~~~~~~~~~~~~~~~

- Use the Grove platform to write and test your JavaScript code examples.
  See :ref:`grove-platform` for more information.
- Use descriptive test names and simple assertions:

  .. code-block:: javascript

     test("inserts document successfully", async () => {
       const result = await collection.insertOne(doc);
       expect(result.insertedId).toBeDefined();
     });

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

.. _truncations-and-omissions-js:

Truncations and Omissions
~~~~~~~~~~~~~~~~~~~~~~~~~

-  Use a commented ellipsis (``...``) to denote where code has been
   deliberately omitted or truncated in an example.

   .. code-block:: javascript

      try {
        const result = await collection.insertOne(doc);
        // ... handle result
      } catch (error) {
        console.error(error);
      }

.. important::

   Always include an explanation comment when the ellipsis appears in a
   docs-facing code example (as opposed to tests).

TypeScript Considerations
~~~~~~~~~~~~~~~~~~~~~~~~~

When writing TypeScript examples:

- Include type annotations when they improve clarity:

  .. code-block:: typescript

     interface User {
       name: string;
       age: number;
     }

     const user: User = { name: "Alice", age: 30 };
     const result = await collection.insertOne(user);

- Specify the document type for collections:

  .. code-block:: typescript

     const collection = database.collection<User>("users");

- Avoid using ``any`` unless the example specifically demonstrates dynamic typing.
- When a method returns a result, show the type explicitly to help readers
  understand the return type:

  .. code-block:: typescript

     const result: InsertOneResult = await collection.insertOne(doc);

Variables
~~~~~~~~~

- Use ``const`` for variables that are not reassigned:

  .. code-block:: javascript

     const uri = process.env.MONGODB_URI;
     const client = new MongoClient(uri);
     const database = client.db('sample_db');

- Use ``let`` for variables that need to be reassigned:

  .. code-block:: javascript

     let retryCount = 0;
     while (retryCount < maxRetries) {
       // ... attempt operation
       retryCount++;
     }

- Do not use ``var``. It has function-scoped behavior that can lead to
  unexpected bugs. Always use ``const`` or ``let`` instead.
