For a compound index that includes ``2dsphere`` index keys and
keys for other types, only the ``2dsphere`` index fields determine
whether the index references a document.

:ref:`Partial indexes <index-type-partial>` have a superset of the
sparse index functionality. Unless your application has a specific
requirement, use partial indexes instead of sparse indexes.
