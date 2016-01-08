To use a :doc:`/reference/readConcern` level of
:readconcern:`"majority"`, you must use the WiredTiger storage engine
and start the :program:`mongod` instances with the
:option:`--enableMajorityReadConcern` command line option (or the
:setting:`replication.enableMajorityReadConcern` setting if using a
configuration file).

.. include:: /includes/fact-readConcern-majority-protocolVersion.rst
