Starting in MongoDB 5.0, :ref:`unique sparse <sparse-unique-index>` 
and :ref:`unique non-sparse <unique-index>` indexes with the same 
:ref:`key pattern<key_patterns>` can exist on a single collection.

Unique and Sparse Index Creation
````````````````````````````````

This example creates multiple indexes with the same key pattern and 
different ``sparse`` options:

.. literalinclude:: /code-examples/tested/command-line/mongosh/indexes/sparse/create-5.js
   :language: javascript
   :category: usage example

.. literalinclude:: /code-examples/tested/command-line/mongosh/indexes/sparse/create-6.js
   :language: javascript
   :category: usage example


Basic and Sparse Index Creation
```````````````````````````````

You can also create basic indexes with the same key pattern with and 
without the sparse option:


.. literalinclude:: /code-examples/tested/command-line/mongosh/indexes/sparse/create-7.js
   :language: javascript
   :category: usage example


.. literalinclude:: /code-examples/tested/command-line/mongosh/indexes/sparse/create-8.js
   :language: javascript
   :category: usage example
