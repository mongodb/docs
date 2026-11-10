Starting in MongoDB 6.0, you see a ``fullDocumentBeforeChange``
document with the fields before the document was changed (or deleted)
if you perform these steps:

#. Enable the new ``changeStreamPreAndPostImages`` field for a
   collection using :method:`db.createCollection()`,
   :dbcommand:`create`, or :dbcommand:`collMod`.

#. Set ``fullDocumentBeforeChange`` to ``"required"`` or
   ``"whenAvailable"`` in :method:`db.collection.watch()`.

Example ``fullDocumentBeforeChange`` document in the change stream
output:

.. code-block:: json
   :copyable: false

   "fullDocumentBeforeChange" : {
      "_id" : ObjectId("599af247bb69cd89961c986d"), 
      "userName" : "alice123",
      "name" : "Alice Smith"
   }

For complete examples with the change stream output, see
:ref:`db.collection.watch-change-streams-pre-and-post-images-example`.
