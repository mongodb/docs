Linearizable read concern guarantees only apply if read operations
specify a query filter that uniquely identifies a single document.
Additionally if none of the following criteria are met, linearizable
read concern might not read from a consistent snapshot, resulting in a
document matching the filter not being returned:

- The query uses an immutable field as the search key of the query. For
  example, searching on the ``_id`` field or using :operator:`$natural`.

- No concurrent updates mutate the search key of the query.

- The search key has a :ref:`unique index <index-type-unique>` and the
  query uses that index.

If any of the preceding criteria are met, the query reads from a
consistent snapshot to return the single matching document.
