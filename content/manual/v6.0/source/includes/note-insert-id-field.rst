.. note::

   Most MongoDB driver clients include the ``_id`` field and
   generate an ``ObjectId`` before sending the insert operation to
   MongoDB. However, if the client sends a document without an ``_id``
   field, the :binary:`~bin.mongod` adds the ``_id`` field and generates
   the ``ObjectId``.
