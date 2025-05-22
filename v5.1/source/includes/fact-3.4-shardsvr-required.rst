For MongoDB 3.4 sharded clusters, :binary:`~bin.mongod` instances for
the shards **must** explicitly specify its role as a ``shardsvr``,
either via the configuration file setting
:setting:`sharding.clusterRole` or via the command line option
:option:`--shardsvr <mongod --shardsvr>`.

.. note::

   Default port for :binary:`~bin.mongod` instances with the ``shardsvr``
   role is ``27018``. To use a different port, specify
   :setting:`net.port` setting or :option:`--port <mongod --port>` option.
