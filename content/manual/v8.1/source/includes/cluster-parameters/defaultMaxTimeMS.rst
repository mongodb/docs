Specifies a default time limit in milliseconds for individual read
operations to complete. If a query specifies a
:method:`~cursor.maxTimeMS()` option, that value overrides the
``defaultMaxTimeMS`` value.

``defaultMaxTimeMS`` applies to the following read operations:

- :dbcommand:`aggregate` (except :pipeline:`$merge` and :pipeline:`$out`
  stages)

- :dbcommand:`count`

- :dbcommand:`dbHash`

- :dbcommand:`distinct`

- :dbcommand:`find`
