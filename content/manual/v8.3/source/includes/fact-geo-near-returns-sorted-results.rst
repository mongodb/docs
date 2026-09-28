The |geo-operation| operator sorts documents by distance.

- If you use the :method:`~cursor.sort` method in your query,
  MongoDB performs a second sort operation, re-ordering the matching
  documents.  When querying large collections, this can negatively 
  affect query performance.

- If the order of the documents is not important to you, consider
  using the :query:`$geoWithin` operator instead, as it returns 
  unsorted results.

- |geo-operation| is a Match Execution operator and is not
  permitted in aggregation pipelines.

