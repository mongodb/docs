The :dbcommand:`convertToCapped` will not recreate indexes from
the original collection on the new collection, other than the
index on the ``_id`` field. If you need indexes on this
collection you will need to create these indexes after the
conversion is complete.
