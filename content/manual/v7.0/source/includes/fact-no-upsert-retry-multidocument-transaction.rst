Starting in MongoDB 7.0.22, if an ``upsert`` operation runs in a multidocument 
transaction, then the ``upsert`` does not retry when it encounters a duplicate key error.