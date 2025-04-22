The packages include various :term:`control scripts <control script>`,
including the init script ``/etc/rc.d/init.d/mongod``. These packages
configure MongoDB using the ``/etc/mongod.conf`` file in conjunction
with the control scripts.

As of version |release|, there are no control scripts for
:binary:`~bin.mongos`. :binary:`~bin.mongos` is only used in :doc:`sharding
deployments </core/sharded-clusters>`. You can use the :binary:`~bin.mongod` init
script to derive your own :binary:`~bin.mongos` control script.
