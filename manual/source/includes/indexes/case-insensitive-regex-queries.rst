Case-insensitive indexes typically do not improve performance for
:query:`$regex` queries. The ``$regex`` implementation is not
collation-aware and cannot utilize case-insensitive indexes efficiently.
