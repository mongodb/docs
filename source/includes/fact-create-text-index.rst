To perform text search queries, you must have a
``text`` index on your collection. A collection can only have **one**
text search index, but that index can cover multiple fields.

For example you can run the following in a :binary:`~bin.mongo` shell to
allow text search over the ``name`` and ``description`` fields:

.. code-block:: javascript

   db.stores.createIndex( { name: "text", description: "text" } )
