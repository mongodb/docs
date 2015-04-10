For example, the following will raise an error:

.. code-block:: javascript

   db.collection.update( { "_id.authorID": 1 },
      { "name": "Robert Frost" },
      { upsert: true } )
