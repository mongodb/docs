Starting in MongoDB 8.0, the existing ``queryHash`` field is duplicated
in a new field named ``planCacheShapeHash``. If you're using an earlier
MongoDB version, you'll only see the ``queryHash`` field. Future MongoDB
versions will remove the deprecated ``queryHash`` field, and you'll need
to use the ``planCacheShapeHash`` field instead.
