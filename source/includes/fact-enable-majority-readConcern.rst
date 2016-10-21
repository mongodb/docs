To use :term:`read concern` level of :readconcern:`"majority"`, 

- you must start the :program:`mongod` instances with the
  :option:`--enableMajorityReadConcern` command line option (or the
  :setting:`replication.enableMajorityReadConcern` set to ``true`` if
  using a configuration file).

- replica sets must use :ref:`WiredTiger storage engine
  <storage-wiredtiger>` and election :rsconf:`protocol version 1
  <protocolVersion>`.
