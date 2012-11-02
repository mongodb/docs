.. note::

.. todo When draft/core/write-operations.txt goes live, change:
   :ref:`write concern <write-concern>`
   to
   :ref:`write concern <write-operations-write-concern>`

   The ``_id`` field must hold a unique value. If you specify a value
   for ``_id`` that already exists in a collection the
   :program:`mongod` will produce a duplicate key exception and reject
   this document. To detect these situations always use appropriate
   :ref:`write concern <write-concern>`.
