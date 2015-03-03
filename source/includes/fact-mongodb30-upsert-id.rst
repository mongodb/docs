When you execute an :method:`~db.collection.update()` with the ``upsert``
option, you can no longer use :ref:`document-dot-notation` to only select on
part of the ``_id`` field. For example, the following will raise an error:

.. code-block:: javascript

   db.collection.update( { "_id.authorID": 1 },
      { "name": "Robert Frost" },
      { upsert: true } )
