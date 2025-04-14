.. note::

   The ``_id`` field must hold a unique value. If you specify a value
   for ``_id`` that already exists in a collection the
   :binary:`~bin.mongod` will produce a duplicate key exception and reject
   this document. To detect these situations always use appropriate
   :ref:`write concern <write-concern>`.
