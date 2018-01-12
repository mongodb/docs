To use a :term:`read concern` level of :readconcern:`"majority"`, you
must use the WiredTiger storage engine and start the :binary:`~bin.mongod`
instances with the :option:`--enableMajorityReadConcern  <mongod --enableMajorityReadConcern>` command line
option (or the :setting:`replication.enableMajorityReadConcern` setting
if using a configuration file).

.. include:: /includes/fact-readConcern-majority-protocolVersion.rst
