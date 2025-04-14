
.. note::

   Unsharding a collection is a write-intensive operation that can result in an
   increased :term:`oplog` growth rate. To help mitigate this, consider the following
   configuration changes:
   
   - To prevent unbounded oplog growth, set a fixed oplog size.
   - To reduce the chance of secondaries becoming stale, increase the oplog size.
   
   For more details, see the :ref:`replica-set-oplog`.
