Run the following in :binary:`~bin.mongosh` to allow text search over 
the ``name`` and ``description`` fields:

.. code-block:: javascript

   db.stores.createIndex( { name: "text", description: "text" } )
