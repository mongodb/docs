When you execute an :method:`~db.collection.update()` with ``upsert:
true`` and the query matches no existing document, MongoDB will refuse
to insert a new document if the query specifies conditions on the
``_id`` field using :ref:`dot notation <document-dot-notation>`.

.. end-short-description

This restriction ensures that the order of fields embedded in the
``_id`` document is well-defined and not bound to the order specified in
the query.

If you attempt to insert a document in this way, MongoDB will raise an
error. For example, consider the following update operation. Since the
update operation specifies ``upsert:true`` and the query specifies
conditions on the ``_id`` field using dot notation, then the update will
result in an error when constructing the document to insert.

.. code-block:: javascript

   db.collection.update(
      { "_id.name": "Robert Frost", "_id.uid": 0 },  // Query parameter
      { $set:
         {
            "categories": [ "poet", "playwright" ]  // Replacement document
         }
      },
      { upsert: true }  // Options
   )
