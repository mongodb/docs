
- You :red:`must` run on a :binary:`~bin.mongos` either in a
  :doc:`transaction </core/transactions>` or as a :doc:`retryable
  write </core/retryable-writes>`. Do :red:`not` issue the operation
  directly on the shard.

- You :red:`must` include an equality condition on the full shard
  key in the query filter. For example, if a collection ``messages``
  uses ``{ country : 1, userid : 1 }`` as the shard key, to update
  the shard key for a document, you must include ``country: <value>,
  userid: <value>`` in the query filter. You can include additional
  fields in the query as appropriate.
