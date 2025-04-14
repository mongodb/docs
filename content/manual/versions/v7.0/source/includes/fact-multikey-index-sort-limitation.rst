When you sort based on an array field that is indexed with a
:ref:`multikey index <index-type-multikey>`, the query plan includes a
:term:`blocking sort` stage unless both of the following are true:

- The index :ref:`boundaries <multikey-index-bounds-intersecting>` for
  all sort fields are ``[MinKey, MaxKey]``.

- No boundaries for any multikey-indexed field have the same path prefix
  as the sort pattern.
