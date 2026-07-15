Use the following code to create an index on the ``movies`` collection of the
``sample_mflix`` database with the collation locale ``"fr"`` for string 
comparisons:

.. literalinclude:: /code-examples/tested/command-line/mongosh/indexes/collation/create-collation-index/create-index.snippet.create-collation-index.js
   :language: javascript
   :category: usage example

The following query, which specifies the same collation as the index,
can use the index:

.. literalinclude:: /code-examples/tested/command-line/mongosh/indexes/collation/find-collation-index/find.snippet.find-collation-index.js
   :language: javascript
   :category: usage example

However, the following query operation, which by default uses the
"simple" binary collator, cannot use the index and requires a ``COLLSCAN``.

.. literalinclude:: /code-examples/tested/command-line/mongosh/indexes/collation/find-no-collation-index/find.snippet.find-no-collation-index.js
   :language: javascript
   :category: usage example

For a compound index where the index prefix keys are not strings,
arrays, and embedded documents, an operation that specifies a
different collation can still use the index to support comparisons
on the index prefix keys.

For example, you can use the following code to create a compound index on the
``movies`` collection of the ``sample_mflix`` database specifying the 
numeric fields ``year`` and ``metacritic`` and the string field ``title``. 
The index also specifies the collation locale ``"fr"`` for string 
comparisons:

.. literalinclude:: /code-examples/tested/command-line/mongosh/indexes/collation/create-collation-compound-index/create-index.snippet.create-collation-compound-index.js
   :language: javascript
   :category: usage example

The following operations, which use ``"simple"`` binary collation
for string comparisons, can use the index:

.. literalinclude:: /code-examples/tested/command-line/mongosh/indexes/collation/find-compound-collation-index-year/find.snippet.find-compound-collation-index-year.js
   :language: javascript
   :category: usage example

.. literalinclude:: /code-examples/tested/command-line/mongosh/indexes/collation/find-compound-collation-index-year-title/find.snippet.find-compound-collation-index-year-title.js
   :language: javascript
   :category: usage example

The following operation, which uses ``"simple"`` binary collation
for string comparisons on the indexed ``title`` field, can use
the index to fulfill only the ``year: 2012`` portion of the query:

.. literalinclude:: /code-examples/tested/command-line/mongosh/indexes/collation/find-compound-index-year-partial/find.snippet.find-compound-index-year-partial.js
   :language: javascript
   :category: usage example

To confirm whether a query used an index, run the query with the
:method:`~cursor.explain()` option.

.. important::

   Matches against document keys, including embedded document keys, 
   use simple binary comparison. This means that a query for a key  
   like "type.café" will not match the key "type.cafe", regardless of
   the value you set for the :ref:`strength
   <collation-parameter-strength>` parameter.