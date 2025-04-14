.. hint-and-text-query

If a query includes a :query:`$text` expression, you cannot use
:method:`~cursor.hint()` to specify which index to use for the query.
