Starting in MongoDB 8.3, |drop-index| is idempotent. If you specify
an index that does not exist, |drop-index| ignores the non-existent
index and completes successfully instead of returning an
``IndexNotFound`` error. In earlier versions, |drop-index| returns an
``IndexNotFound`` error if the specified index does not exist.
