:binary:`~bin.mongoimport` and :binary:`~bin.mongoexport` are not
intended for the following use cases:

- backing up and restoring data
- converting data on a MongoDB cluster to a different format (for
  example, converting to JSON) and then back to a MongoDB cluster.

Instead, use :binary:`~bin.mongodump` or :binary:`~bin.mongorestore`. 