The following operation appends the :method:`~cursor.showRecordId()`
method to the :method:`db.collection.find()` method in order to include
storage engine record information in the matching documents:

.. code-block:: javascript

   db.collection.find( { a: 1 } ).showRecordId()

The operation returns the following documents, which include the ``$recordId``
field:

.. code-block:: javascript

   {
     "_id" : ObjectId("53908ccb18facd50a75bfbac"),
     "a" : 1,
     "b" : 1,
     "$recordId" : NumberLong(168112)
   }
   {
      "_id" : ObjectId("53908cd518facd50a75bfbad"),
      "a" : 1,
      "b" : 2,
      "$recordId" : NumberLong(168176)
   }

You can :term:`project <projection>` the added field ``$recordId``, as in the
following example:

.. code-block:: javascript

   db.collection.find( { a: 1 }, { $recordId: 1 } ).showRecordId()

This query returns only the ``_id`` field and the ``$recordId``
field in the matching documents:

.. code-block:: javascript

   {
     "_id" : ObjectId("53908ccb18facd50a75bfbac"),
     "$recordId" : NumberLong(168112)
   }
   {
      "_id" : ObjectId("53908cd518facd50a75bfbad"),
      "$recordId" : NumberLong(168176)
   }
