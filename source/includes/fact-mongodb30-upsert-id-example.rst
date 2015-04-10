For example, consider the following update operation. Since the update
operation specifies ``upsert:true`` and the query specifies conditions on the
``_id`` field using dot notation, then the update will result in an error when
constructing the document to insert.

.. code-block:: javascript

   db.collection.update( { "_id.name": "Robert Frost", "_id.uid": 0 },
      { "categories": ["poet", "playwright"] },
      { upsert: true } )
