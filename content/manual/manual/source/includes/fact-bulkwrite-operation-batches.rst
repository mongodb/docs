There is no limit to the amount of :ref:`write <query-and-write-commands>` operations that a driver can handle. 
Drivers group data into batches according to the :limit:`maxWriteBatchSize <Write Command Batch Limit Size>`, 
which is 100,000 and cannot be modified. If the batch contains more than 100,000 operations, the driver divides the batch into 
smaller groups with counts less than or equal to the :limit:`maxWriteBatchSize <Write Command Batch Limit Size>`. For example, if the operation 
contains 250,000 operations, the driver creates three batches: two with 100,000 operations and one with 50,000 operations.

.. note::

   The driver only divides the group into smaller groups when using
   the high-level API. If using :method:`db.runCommand()` directly
   (for example, when writing a driver), MongoDB throws an error when
   attempting to execute a write batch which exceeds the limit.

If the error report for a single batch grows too large, MongoDB 
truncates all remaining error messages to the empty string. If there 
are at least two error messages with total size greater than ``1MB``, 
they are truncated.

The sizes and grouping mechanics are internal performance details and
are subject to change in future versions.
