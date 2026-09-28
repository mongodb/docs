If the collection does not exist, then |method| creates the collection.

If the document to insert does not specify an :term:`_id` field, then :binary:`~bin.mongod`
adds the ``_id`` field and assigns a unique
:method:`ObjectId` for the document. Most
drivers create an ObjectId and insert the ``_id`` field, but the
:binary:`~bin.mongod` will create and populate the ``_id`` if the driver or
application does not.

If the document contains an ``_id`` field, the ``_id`` value must be
unique within the collection to avoid duplicate key error.
