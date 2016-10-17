For MongoDB 3.4 sharded clusters, :program:`mongod` instances for
the shards **must** explicitly specify its role as a ``shardsvr``,
either via the configuration file setting
:setting:`sharding.clusterRole` or via the command line option
:option:`--shardsvr`.

.. note::

   Default port for :program:`mongod` instances with the ``shardsvr``
   role is ``27018``. To use a different port, specify
   :setting:`net.port` setting or ``--port`` option.
