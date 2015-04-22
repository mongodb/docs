- Regardless of :doc:`write concern </reference/write-concern>`, other
  clients can see the result of the write operations before the write
  operation is acknowledged to the issuing client.

- Clients can read data which may be subsequently :doc:`rolled back
  </core/replica-set-rollbacks>`.
