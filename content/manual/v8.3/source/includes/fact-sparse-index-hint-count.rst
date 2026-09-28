If you include a :method:`~cursor.hint()` that specifies a
:ref:`sparse index <index-type-sparse>` when you perform a
:method:`~cursor.count()` of all documents in a collection (i.e. with
an empty query predicate), the sparse index is used even if the sparse
index results in an incorrect count.


For example, create a sparse index on the ``rated`` field on the ``movies``
collection. 

.. literalinclude:: /code-examples/tested/command-line/mongosh/indexes/sparse/create-9.js
   :language: javascript
   :category: usage example

If you count the number of documents in the ``movies`` collection and include a
hint that specifies that sparse index, the operation returns only the documents
that contain the ``rated`` field. 

.. literalinclude:: /code-examples/tested/command-line/mongosh/indexes/sparse/query-4.js
   :language: javascript
   :category: usage example

To obtain the correct count of the number of documents in the ``movies``
collection, do not :method:`~cursor.hint()` with a :ref:`sparse index
<index-type-sparse>` when performing a count of all documents in a collection.

.. literalinclude:: /code-examples/tested/command-line/mongosh/indexes/sparse/query-5.js
   :language: javascript
   :category: usage example

