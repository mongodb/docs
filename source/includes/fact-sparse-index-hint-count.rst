If you include a :method:`~cursor.hint()` that specifies a
:ref:`sparse index <index-type-sparse>` when you perform a
:method:`~cursor.count()` of all documents in a collection (i.e. with
an empty query predicate), the sparse index is used even if the sparse
index results in an incorrect count.

.. code-block:: javascript

   db.collection.insertOne( { _id: 1, y: 1 } );
   db.collection.createIndex( { x: 1 }, { sparse: true } );

   db.collection.find().hint( { x: 1 } ).count();

To obtain the correct count, do not :method:`~cursor.hint()` with a
:ref:`sparse index <index-type-sparse>` when performing a count of all
documents in a collection.

.. code-block:: javascript

   db.collection.find().count();

   db.collection.createIndex( { y: 1 } );
   db.collection.find().hint( { y: 1 } ).count();
