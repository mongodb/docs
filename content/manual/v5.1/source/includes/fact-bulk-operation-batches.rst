Each group of operations can have at most :limit:`1000 operations <Write Command Batch Limit Size>`. If a group exceeds this
:limit:`limit <Write Command Batch Limit Size>`, MongoDB will divide
the group into smaller groups of 1000 or less. For example, if the bulk
operations list consists of 2000 insert operations, MongoDB creates 2
groups, each with 1000 operations.

The sizes and grouping mechanics are internal performance details and
are subject to change in future versions.

To see how the operations are grouped for a bulk operation execution,
call :method:`Bulk.getOperations()` *after* the execution.
