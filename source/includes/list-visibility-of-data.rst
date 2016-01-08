- Regardless of :doc:`write concern </reference/write-concern>`, other
  clients using :readconcern:`"local"` (i.e. the default) readConcern
  can see the result of a write operation before the write operation is
  acknowledged to the issuing client.

- Clients using :readconcern:`"local"` (i.e. the default) readConcern
  can read data which may be subsequently :doc:`rolled back
  </core/replica-set-rollbacks>`.
