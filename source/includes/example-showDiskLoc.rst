The following operation appends the :method:`~cursor.showDiskLoc()`
method to the :method:`db.collection.find()` method in order to include
in the matching documents the disk location information:

.. code-block:: javascript

   db.collection.find( { a: 1 } ).showDiskLoc()

The operation returns the following documents, which includes the
``$diskLoc`` field:

.. code-block:: javascript

   {
     "_id" : ObjectId("53908ccb18facd50a75bfbac"), 
     "a" : 1, 
     "b" : 1, 
     "$diskLoc" : { "file" : 0, "offset" : 16195760 } 
   }
   {
      "_id" : ObjectId("53908cd518facd50a75bfbad"),
      "a" : 1,
      "b" : 2,
      "$diskLoc" : { "file" : 0, "offset" : 16195824 }
   }

The :term:`projection` can also access the added field ``$diskLoc``,
as in the following example:

.. code-block:: javascript

   db.collection.find( { a: 1 }, { $diskLoc: 1 } ).showDiskLoc()

The operation returns just the ``_id`` field and the ``$diskLoc``
field in the matching documents:

.. code-block:: javascript

   {
     "_id" : ObjectId("53908ccb18facd50a75bfbac"), 
     "$diskLoc" : { "file" : 0, "offset" : 16195760 } 
   }
   {
      "_id" : ObjectId("53908cd518facd50a75bfbad"),
      "$diskLoc" : { "file" : 0, "offset" : 16195824 }
   }
