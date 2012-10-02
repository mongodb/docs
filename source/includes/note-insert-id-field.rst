.. note::

   Most MongoDB clients will include ``_id`` field and generate an
   ``ObjectId`` before sending the insert operation to MongoDB;
   however, if the client sends a document without an ``_id`` field,
   the :program:`mongod` will add the ``_id`` field and generate the
   ``ObjectId``.
