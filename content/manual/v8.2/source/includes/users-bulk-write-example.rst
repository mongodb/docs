The :method:`db.collection.bulkWrite()` example runs
the following operations on the ``users`` collection:

- Adds two documents using ``insertOne``.
- Updates a document using ``updateOne``.
- Deletes a document using ``deleteOne``.
- Replaces a document using ``replaceOne``.

.. literalinclude:: /code-examples/tested/command-line/mongosh/bulkWrite/insert.js
   :language: javascript
   :category: usage example

Example output, which includes a summary of the completed operations:

.. literalinclude:: /code-examples/tested/command-line/mongosh/bulkWrite/insert-output.sh
   :language: javascript
   :category: example return object
   :copyable: false