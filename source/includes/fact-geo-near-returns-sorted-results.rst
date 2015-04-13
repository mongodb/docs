|geo-operation| sorts documents by distance. If you also include a
:method:`~cursor.sort()` for the query, :method:`~cursor.sort()`
re-orders the matching documents, effectively overriding the sort
operation already performed by |geo-operation|. When using
:method:`~cursor.sort()` with geospatial queries, consider using
:query:`$geoWithin` operator, which does not sort documents, instead of
|geo-operation|.
