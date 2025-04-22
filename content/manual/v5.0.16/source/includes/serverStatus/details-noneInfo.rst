Number of non-transaction query operations that use default write
concerns. The metrics track usage of the :dbcommand:`cluster wide write
concern <setDefaultRWConcern>` (the global default write concern) and
the implicit-default write concern.

The sum of the values in ``opWriteConcernCounters.noneInfo`` should
equal the value of ``opWriteConcernCounters.none``.