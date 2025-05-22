Starting in MongoDB 5.1, when starting, restarting or adding a
:ref:`shard server <sharding-shards>` with :method:`sh.addShard()` the
:ref:`Cluster Wide Write Concern (CWWC) <set_global_default_write_concern>` 
must be set.

If the ``CWWC`` is not set and the shard is configured
such that the :ref:`default write concern <write-concern>` is 
``{ w : 1 }`` the shard server will fail to start or be added 
and returns an error.

See :ref:`default write concern calculations <default-wc-formula>` for 
details on how the default write concern is calculated.
