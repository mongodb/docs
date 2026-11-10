As a result of changes to sorting behavior on array fields in MongoDB
4.4, when you sort on an array indexed with a
:ref:`multikey index <index-type-multikey>`, the query plan includes
a :term:`blocking sort` stage, unless:

- The index :ref:`boundaries <multikey-index-bounds-intersecting>` for all sort 
  fields are ``[MinKey, MaxKey]``, *and*

- No boundaries for any multikey-indexed field have the same path prefix as the sort 
  pattern.
