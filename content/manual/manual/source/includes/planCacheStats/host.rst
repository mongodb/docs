The hostname and port of the :binary:`~bin.mongod` instance from which
the plan cache information was returned.

When run on a sharded cluster, the operation returns plan cache entry
information from a single member in each shard replica set. This member
is identified with the :ref:`shard <plancachestats-shard>` and
:ref:`host <plancachestats-host>` fields. See also
:ref:`plancachestats-read-pref`.
