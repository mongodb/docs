:method:`Bulk()` operations and comparable methods in the drivers do not
have a limit for the number of operations in a group. To see how the
operations are grouped for bulk operation execution, call
:method:`Bulk.getOperations()` *after* the execution.

.. seealso::

   - :limit:`Write Command Batch Limit Size`
