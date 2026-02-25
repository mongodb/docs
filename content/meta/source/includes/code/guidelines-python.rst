Code Style Guidelines
---------------------

This section describes conventions for writing Python code examples in
documentation. The goal is to keep examples readable, idiomatic, and easy
for readers to adapt while avoiding unnecessary complexity.

See `PEP 8 <https://peps.python.org/pep-0008/>`__ and the
`Google Python Style Guide <https://google.github.io/styleguide/pyguide.html>`__
for additional guidance.

Assumptions and Compatibility
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Target a modern Python version (currently Python 3.10 or later) unless a procedure or
  compatibility note requires an older version.
- Avoid deprecated patterns such as the legacy ``%`` string formatting.
- Avoid framework-specific patterns unless the page is explicitly about
  that framework (for example, a Flask or Django tutorial).

Async/Await
~~~~~~~~~~~

PyMongo supports both synchronous and asynchronous operations. Choose the
approach that best fits the example's purpose.

Synchronous
###########

Use synchronous code for:

- Quick-start examples and simple operations.
- Examples where async adds complexity without benefit.
- Tutorials aimed at beginners:

  .. code-block:: python

     from pymongo import MongoClient

     client = MongoClient(uri)
     collection = client["sample_db"]["users"]
     result = collection.insert_one({"name": "Alice", "age": 30})
     print(result.inserted_id)

Asynchronous
############

Use ``async``/``await`` with the Motor driver or PyMongo's async API for:

- Examples demonstrating high-concurrency patterns.
- Integration with async web frameworks (FastAPI, aiohttp).
- Examples where async is the focus:

  .. code-block:: python

     import asyncio
     from motor.motor_asyncio import AsyncIOMotorClient

     async def main():
         client = AsyncIOMotorClient(uri)
         collection = client["sample_db"]["users"]
         result = await collection.insert_one({"name": "Alice", "age": 30})
         print(result.inserted_id)

     asyncio.run(main())

.. tip::

   Consider showing both approaches when the page serves readers with
   different needs, using tabs or separate sections.

Code Comments
~~~~~~~~~~~~~

Comments help clarify the intent of the code and help readers better understand it.

- Use code comments to explain or call out important details, including:

  - Non-obvious logic or intent. *Don't* restate the code.

    .. tip::

       Rewrite your code to avoid trivial comments. For example,
       meaningful and self-explanatory naming is better than a comment.

  - Omitted or truncated code sections. If you need to omit code, use a
    comment to indicate what is missing and why. See :ref:`truncations-and-omissions-python`.

- Use short, inline comments within one line of 60-80 characters when possible.
- Put comments on separate lines *before* the code they're commenting on.

Inline
######

In general, use single-line inline comments to comment your code when possible.
Inline comments provide small bits of information without disrupting the code's flow.

- Keep the comment on the line above the code it's commenting on.
- Avoid inline comments on the same line as the code.

.. code-block:: python

   # PREFERRED: Put your inline comment on the line above the code it's commenting on.
   x = 5

   y = 10  # AVOID: Don't put your inline comment on the same line as the code.

Multi-line
##########

Use multiple consecutive single-line comments when an explanation or description
exceeds one line. For example, you might need to describe the overall
purpose of a long code section or some especially complex logic.

.. code-block:: python

   # This is a longer comment that spans multiple lines.
   # Each line starts with the comment prefix.
   # Use consecutive single-line comments for multi-line explanations.
   y = 10

.. note::

   Python supports multi-line strings (``"""..."""``) as block comments,
   but the convention is to use consecutive ``#`` comments instead.
   Reserve triple-quoted strings for docstrings.

Docstrings
##########

Include `docstrings <https://peps.python.org/pep-0257/>`__ when the example
is teaching an API or design pattern that benefits from it, such as in a sample app.

Use the Google docstring format for consistency:

.. code-block:: python

   def insert_user(collection, user):
       """Insert a user document into the users collection.

       Args:
           collection: The MongoDB collection.
           user: The user document to insert.

       Returns:
           The result of the insert operation.

       Raises:
           PyMongoError: If the insert operation fails.
       """
       return collection.insert_one(user)

Code Block Height
~~~~~~~~~~~~~~~~~

- Ideally, most code examples should be short, around 15-25 lines. However, they
  can exceed this height if needed to accomplish the intended purpose.
- If a code block is too long to comfortably display on a single screen, consider:

  - Breaking it into multiple blocks.
  - Hiding non-essential parts of the code. See :ref:`truncations-and-omissions-python`.
  - Using emphasis to draw attention to the most important parts of the code.
    See :ref:`code-example-formatting-emphasis`.

- Avoid trailing whitespace.

Conditional Logic
~~~~~~~~~~~~~~~~~

- Keep conditional logic (or "control flow") shallow and easy to follow:

  .. code-block:: python

     if documents:
         result = collection.insert_many(documents)
         print(f"Inserted {len(result.inserted_ids)} documents")

- Avoid deeply nested ``if``/``else`` blocks or multi-level loops in short
  examples.
- Use early returns when they simplify the example logic.
- Use truthiness checks where appropriate (``if documents:`` instead of
  ``if len(documents) > 0:``).

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
  See also :ref:`placeholders-python`.

Context Managers
~~~~~~~~~~~~~~~~

Use context managers (``with`` statements) for resource management when available.
PyMongo's ``MongoClient`` supports the context manager protocol:

.. code-block:: python

   with MongoClient(uri) as client:
       collection = client["sample_db"]["users"]
       result = collection.insert_one(doc)
       print(result.inserted_id)

For cursors, iteration handles cleanup automatically, but you can use a context
manager when you need explicit control:

.. code-block:: python

   with collection.find(filter) as cursor:
       for doc in cursor:
           print(doc)

See also :ref:`resource-management-python`.

Dictionaries and Documents
~~~~~~~~~~~~~~~~~~~~~~~~~~

The PyMongo driver works with Python dictionaries as documents. Use the
following conventions when working with documents:

- Use plain dictionaries for most document operations:

  .. code-block:: python

     doc = {
         "name": "Alice",
         "age": 30,
         "email": "alice@example.com",
     }
     result = collection.insert_one(doc)

- When you need to specify BSON types explicitly, import them from ``bson``:

  .. code-block:: python

     from bson import ObjectId, Decimal128

     doc = {
         "_id": ObjectId(),
         "price": Decimal128("19.99"),
     }

- For query filters and update operations, use dictionary literals:

  .. code-block:: python

     # Filter
     filter = {"status": "active", "age": {"$gte": 21}}

     # Update
     update = {"$set": {"verified": True}}

     result = collection.update_one(filter, update)

Error Handling
~~~~~~~~~~~~~~

- Show realistic error handling. Use ``try``/``except``/``finally`` blocks:

  .. code-block:: python

     from pymongo.errors import PyMongoError

     try:
         result = collection.insert_one(doc)
         print(result.inserted_id)
     except PyMongoError as e:
         print(f"Insert failed: {e}")

- Use specific exceptions when possible:

  .. code-block:: python

     from pymongo.errors import DuplicateKeyError, ServerSelectionTimeoutError

     try:
         result = collection.insert_one(doc)
     except DuplicateKeyError:
         print("Document with this _id already exists")
     except ServerSelectionTimeoutError:
         print("Could not connect to MongoDB")

- Avoid bare ``except:`` clauses. At minimum, catch ``Exception``.
- Avoid empty ``except`` blocks.

File and Function Structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Use small, single-purpose example files when possible.
- Define connection setup early in the example:

  .. code-block:: python

     import os
     from pymongo import MongoClient

     # Replace the placeholder with your MongoDB deployment's connection string
     uri = os.environ.get("MONGODB_URI", "mongodb://localhost:27017")

     client = MongoClient(uri)
     db = client["sample_db"]
     collection = db["users"]
     # ... example code ...

- For full usage examples, include enough surrounding context to make the snippet
  run (imports, client setup, etc.).
- Keep example functions focused. If a function grows beyond roughly 25-30
  lines, consider splitting the workflow into multiple sections.
- Use ``if __name__ == "__main__":`` for runnable scripts:

  .. code-block:: python

     def main():
         client = MongoClient(uri)
         # ... example code ...

     if __name__ == "__main__":
         main()

Imports
~~~~~~~

- Group imports in this order:

  1. Standard library imports.
  2. Third-party imports (including PyMongo/Motor).
  3. Local application imports.

- Separate each group with a blank line:

  .. code-block:: python

     import os
     from datetime import datetime

     from bson import ObjectId
     from pymongo import MongoClient
     from pymongo.errors import PyMongoError

     from myapp.models import User

- Avoid wildcard imports (``from module import *``).
- Import specific names rather than entire modules when it improves readability:

  .. code-block:: python

     # Preferred for frequently used items
     from pymongo import MongoClient
     from pymongo.errors import PyMongoError

     # Also acceptable
     import pymongo
     client = pymongo.MongoClient(uri)

.. _line-breaks-python:

Line Length and Breaks
~~~~~~~~~~~~~~~~~~~~~~

- Keep lines under 79 characters (PEP 8 recommendation). Up to 99 characters
  is acceptable for code examples if it improves readability.
- Use implicit line continuation inside parentheses, brackets, or braces:

  .. code-block:: python

     result = collection.find_one_and_update(
         {"name": "Alice"},
         {"$set": {"status": "active"}},
         return_document=True,
     )

- Use backslash continuation only when necessary (such as ``with`` statements
  with multiple context managers in Python < 3.10):

  .. code-block:: python

     with open("file1.txt") as f1, \
          open("file2.txt") as f2:
         # ...

- For chained method calls, break after the dot:

  .. code-block:: python

     cursor = (
         collection.find(filter)
         .sort("created_at", -1)
         .limit(10)
     )

Logging and Output
~~~~~~~~~~~~~~~~~~

- Use ``print()`` in short examples to show output clearly.
- Use f-strings for string formatting:

  .. code-block:: python

     print(f"Inserted document with _id: {result.inserted_id}")

- When demonstrating realistic application patterns, use the ``logging``
  module with a minimal configuration. Avoid introducing complex logging
  frameworks unless required by the topic or example type (for example, a sample app).

  .. code-block:: python

     import logging

     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger(__name__)

     logger.info(f"Inserted {len(result.inserted_ids)} documents")

Naming Conventions
~~~~~~~~~~~~~~~~~~

- Favor descriptive names such as ``client``, ``db``, ``collection``,
  ``filter``, and ``result``.
- Avoid placeholder names such as ``foo``, ``bar``, ``tmp``, or overly
  domain-specific names that distract from the example's purpose.
- Use standard Python casing:

  .. list-table::
     :header-rows: 1
     :widths: 20 30 50

     * - Element
       - Casing Convention
       - Example

     * - Variables and functions
       - snake_case
       - ``mongo_client``, ``insert_one``, ``find_documents``

     * - Classes
       - PascalCase
       - ``MongoClient``, ``ObjectId``

     * - Constants
       - UPPER_SNAKE_CASE
       - ``MAX_POOL_SIZE``, ``DEFAULT_TIMEOUT``

     * - Module names
       - snake_case (short, lowercase)
       - ``pymongo``, ``bson``, ``my_module``

     * - Private/internal
       - Leading underscore
       - ``_internal_helper``, ``_cache``

.. _placeholders-python:

Placeholders
~~~~~~~~~~~~

- Use placeholders sparingly, such as for credentials, connection strings,
  or other values that are not essential to the example.
- Always include a comment above the line with the placeholder to explain what it
  represents.
- Highlight the line with the placeholder using ``:emphasize-lines:``.
- Ensure that any placeholder text in code is obvious. Format placeholders
  as directed in :ref:`api-placeholders`.

.. code-block:: python
   :emphasize-lines: 1-2

   # Replace the placeholder with your MongoDB deployment's connection string
   uri = "<your connection string>"

   client = MongoClient(uri)
   # ...

.. _resource-management-python:

Resource Management
~~~~~~~~~~~~~~~~~~~

- Use context managers (``with`` statements) for ``MongoClient`` to ensure
  proper cleanup:

  .. code-block:: python

     with MongoClient(uri) as client:
         db = client["sample_db"]
         collection = db["users"]
         # perform operations

- In short, self-contained examples where lifecycle management isn't the focus,
  you can omit the context manager and add a comment noting that the client
  should be closed in production:

  .. code-block:: python

     client = MongoClient(uri)
     # ... example code ...

     # Close the client when finished (typically with a context manager)
     client.close()

- For cursor iteration, simply iterate over the cursor. PyMongo handles
  cleanup automatically:

  .. code-block:: python

     for doc in collection.find(filter):
         print(doc)

.. _indentation-python:

Tabs, Spaces, and Indentation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Indent with 4 spaces. *Never* use tabs.
- Use consistent indentation for continuation lines:

  .. code-block:: python

     # Aligned with opening delimiter
     result = collection.find_one_and_update(
         {"name": "Alice"},
         {"$set": {"status": "active"}},
     )

     # Hanging indent
     result = collection.find_one_and_update(
         {"name": "Alice"},
         {"$set": {"status": "active"}},
     )

- Keep code aligned and easy to scan.

Aggregation Pipelines
#####################

- When building aggregation pipelines, align stages vertically for
  readability:

  .. code-block:: python

     pipeline = [
         {"$match": {"status": "active"}},
         {"$sort": {"created_at": -1}},
         {"$limit": 10},
     ]

     results = collection.aggregate(pipeline)

- For complex stages, break them onto multiple lines:

  .. code-block:: python

     pipeline = [
         {
             "$match": {
                 "status": "active",
                 "created_at": {"$gte": start_date},
             }
         },
         {
             "$group": {
                 "_id": "$category",
                 "total": {"$sum": "$amount"},
             }
         },
     ]

Options and Keyword Arguments
#############################

- Use keyword arguments for clarity, especially when there are multiple
  optional parameters:

  .. code-block:: python

     result = collection.find_one_and_update(
         filter={"name": "Alice"},
         update={"$set": {"verified": True}},
         return_document=ReturnDocument.AFTER,
         upsert=True,
     )

- For client options, pass them as keyword arguments:

  .. code-block:: python

     client = MongoClient(
         uri,
         maxPoolSize=100,
         minPoolSize=10,
         retryWrites=True,
     )

Testing Examples
~~~~~~~~~~~~~~~~

- Use the Grove platform to write and test your Python code examples.
  See :ref:`grove-platform` for more information.
- Use descriptive test names and simple assertions:

  .. code-block:: python

     def test_inserts_document_successfully():
         result = collection.insert_one(doc)
         assert result.inserted_id is not None

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

.. _truncations-and-omissions-python:

Truncations and Omissions
~~~~~~~~~~~~~~~~~~~~~~~~~

-  Use a commented ellipsis (``...``) to denote where code has been
   deliberately omitted or truncated in an example.

   .. code-block:: python

      try:
          result = collection.insert_one(doc)
          # ... handle result
      except PyMongoError as e:
          print(f"Error: {e}")

.. important::

   Always include an explanation comment when the ellipsis appears in a
   docs-facing code example (as opposed to tests).

Type Hints
~~~~~~~~~~

Type hints (or type annotations) can improve code clarity but should
be used sparingly in code examples.

- Use type hints only when they clarify the expected types, especially for
  complex function signatures:

  .. code-block:: python
     :emphasize-lines: 3

     from pymongo.collection import Collection
     from pymongo.results import InsertOneResult

     def insert_user(collection: Collection, user: dict) -> InsertOneResult:
         return collection.insert_one(user)

- For simple variable assignments, type hints are almost always unnecessary:

  .. code-block:: python

     # Type is obvious from context
     name = "Alice"
     age = 30

     # Type hint adds clarity for complex types
     from typing import Any
     result: dict[str, Any] = collection.find_one(filter)

- Avoid overly complex type annotations that obscure the example's purpose.
- When using generics, prefer the built-in generic syntax:

  .. code-block:: python

     # Preferred
     def process_docs(docs: list[dict]) -> None:
        # ...

     # Older style (still valid, but avoid unless required for compatibility)
     from typing import List, Dict
     def process_docs(docs: List[Dict]) -> None:
        # ...

Virtual Environments
~~~~~~~~~~~~~~~~~~~~

When examples involve installing packages, mention using a virtual
environment:

.. code-block:: python

   # Create and activate a virtual environment (recommended)
   # python -m venv venv
   # source venv/bin/activate  # On Windows: venv\Scripts\activate

   # Install PyMongo
   # pip install pymongo

- Don't include virtual environment setup in every example, but reference it
  in getting started guides and tutorials.
