Starting in MongoDB 8.0, the ``rangePreview`` Queryable Encryption
algorithm is deprecated and removed. Use the ``Range`` algorithm
instead. 

If your Queryable Encryption collection uses ``rangePreview``, you must
drop the collection before you can upgrade to MongoDB 8.0. 