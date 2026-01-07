This example uses :method:`Mongo.bulkWrite()` to perform the following
operations in order on the the :atlas:`sample_mflix database
<sample-data/sample-mflix>`. 

- inserts a document into the ``users`` collection
- updates a document in the ``theaters`` collection
- inserts another document into the ``users`` collection


.. literalinclude:: /code-examples/tested/command-line/mongosh/bulkWrite/getMongo.js
   :language: javascript
   :category: usage example

``mongosh`` performs the bulk write in order and returns the following
document:

.. literalinclude:: /code-examples/tested/command-line/mongosh/bulkWrite/getMongo-output.js
   :language: javascript
   :category: example return object
   :copyable: false