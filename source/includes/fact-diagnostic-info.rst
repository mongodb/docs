- :dbcommand:`aggregate`
- :dbcommand:`count`
- :dbcommand:`delete`
- :dbcommand:`distinct`
- ``find`` (:ref:`OP_QUERY<wire-op-query>` and
  :dbcommand:`command<find>`)
- :dbcommand:`findAndModify`
- ``getMore`` (:ref:`OP_GET_MORE<wire-op-query>` and
  :dbcommand:`command<getMore>`)
- :dbcommand:`insert`
- :dbcommand:`mapReduce`
- :dbcommand:`update`

These operations are also included in the logging of
slow queries. See :setting:`~operationProfiling.slowOpThresholdMs` for
more information about slow query logging.
