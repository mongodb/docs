Case-insensitive indexes do not improve performance for
:query:`$regex` queries, as the ``$regex`` operator is not collation-aware 
and therefore cannot take advantage of such indexes.
