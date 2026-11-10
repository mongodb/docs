MongoDB records |queryStats| operations in the :atlas:`deployment logs
</mongodb-logs/>`. By default, MongoDB only logs the invocation of
``$queryStats`` operations, not the operation's output. For
``$queryStats`` operations that include the ``transformIdentifiers``
option, you can specify whether the transformed output is included in
the log entry.
