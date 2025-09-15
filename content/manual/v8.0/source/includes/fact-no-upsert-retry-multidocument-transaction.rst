Starting in MongoDB 8.0.11, if an ``upsert`` operation runs in a multidocument 
transaction, then the ``upsert`` does not retry when it encounters a duplicate key error.