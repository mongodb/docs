.. note::

   To express ``equal to`` (e.g. ``=``) in the MongoDB query language,
   use JSON ``{ key:value }`` structure. Consider the following
   prototype:

   .. code-block:: javascript

      db.collection.find( { field: value } )

   For example:

   .. code-block:: javascript

      db.collection.find( { a: 42 } )

   This query selects all the documents the where the ``a`` field
   holds a value of ``42``.
