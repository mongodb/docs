- Regardless of :doc:`write concern </reference/write-concern>`, other
  clients using :readconcern:`"local"` or :readconcern:`"available"`
  readConcern can see the result of a write operation before the write
  operation is acknowledged to the issuing client.

  For operations in a :doc:`multi-document transaction
  </core/transactions>`, the data changes made in the transaction are
  not visible outside the transaction until a transaction commits.
  However, other clients can see the result at the time of the
  transaction commit before the commit operation is acknowledged to the
  issuing client.

- Clients using :readconcern:`"local"` or :readconcern:`"available"`
  readConcern can read data which may be subsequently :doc:`rolled back
  </core/replica-set-rollbacks>` during replica set failovers.
