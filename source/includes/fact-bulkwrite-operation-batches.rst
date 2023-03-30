The number of operations in each group cannot exceed the value of
the :limit:`maxWriteBatchSize <Write Command Batch Limit Size>` of
the database. The default value of ``maxWriteBatchSize`` is 
``100,000``. This value is shown in the 
:data:`hello.maxWriteBatchSize` field.

This limit prevents issues with oversized error messages. If a group
exceeds this :limit:`limit <Write Command Batch Limit Size>`,
the client driver divides the group into smaller groups with counts
less than or equal to the value of the limit. For example, with the
``maxWriteBatchSize`` value of ``100,000``, if the queue consists of
``200,000`` operations, the driver creates 2 groups, each with
``100,000`` operations.

.. note::

   The driver only divides the group into smaller groups when using
   the high-level API. If using :method:`db.runCommand()` directly
   (for example, when writing a driver), MongoDB throws an error when
   attempting to execute a write batch which exceeds the limit.

If the error report for a single batch grows too large, MongoDB 
truncates all remaining error messages to the empty string. If there 
are at least two error messages with total size greater than ``1MB``, 
they are trucated.

The sizes and grouping mechanics are internal performance details and
are subject to change in future versions.
