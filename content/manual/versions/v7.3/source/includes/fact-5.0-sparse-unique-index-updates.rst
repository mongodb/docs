Starting in MongoDB 5.0, :ref:`unique sparse <sparse-unique-index>` 
and :ref:`unique non-sparse <unique-index>` indexes with the same 
:ref:`key pattern<key_patterns>` can exist on a single collection.

Unique and Sparse Index Creation
````````````````````````````````

This example creates multiple indexes with the same key pattern and 
different ``sparse`` options:

.. code-block:: javascript

   db.scoreHistory.createIndex( { score : 1 }, { name: "unique_index", unique: true } )
   db.scoreHistory.createIndex( { score : 1 }, { name: "unique_sparse_index", unique: true, sparse: true } )

Basic and Sparse Index Creation
```````````````````````````````

You can also create basic indexes with the same key pattern with and 
without the sparse option:

.. code-block:: javascript

   db.scoreHistory.createIndex( { score : 1 }, { name: "sparse_index", sparse: true } )
   db.scoreHistory.createIndex( { score : 1 }, { name: "basic_index" } )
