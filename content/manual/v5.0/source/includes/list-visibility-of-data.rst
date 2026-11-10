- Regardless of a write's :doc:`write concern </reference/write-concern>`, other
  clients using :readconcern:`"local"` or :readconcern:`"available"`
  read concern can see the result of a write operation before the write
  operation is acknowledged to the issuing client.

- Clients using :readconcern:`"local"` or :readconcern:`"available"`
  read concern can read data which may be subsequently :doc:`rolled
  back </core/replica-set-rollbacks>` during replica set failovers.

For operations in a :doc:`multi-document transaction
</core/transactions>`, when a transaction commits, all data changes
made in the transaction are saved and visible outside the transaction.
That is, a transaction will not commit some of its changes while
rolling back others.

.. include:: /includes/extracts/transactions-committed-visibility.rst
