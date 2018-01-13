.. note::

   Most MongoDB driver clients will include the ``_id`` field and
   generate an ``ObjectId`` before sending the insert operation to
   MongoDB; however, if the client sends a document without an ``_id``
   field, the :binary:`~bin.mongod` will add the ``_id`` field and generate
   the ``ObjectId``.
