Starting in MongoDB 5.0, if you change the
:parameter:`transactionLifetimeLimitSeconds` parameter, you must also
change :parameter:`transactionLifetimeLimitSeconds` to the same value on
all config server replica set members. Keeping this value consistent:

- Ensures the routing table history is retained for at least as long as
  the transaction lifetime limit on the shard replica set members.

- Reduces the transaction retry frequency and therefore improves
  performance.