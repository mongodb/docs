.. list-table::
   :header-rows: 1
   :widths: 20 20 20 40

   * - Source {+Cluster+} Configuration
     - Destination {+Cluster+} Configuration
     - Live Migration Support
     - Notes

   * - Standalone
     - Any type of cluster
     - :icon-fa5:`minus`
     - Before migrating a standalone source {+cluster+} using this
       migration procedure, :manual:`convert the standalone to a replica set </tutorial/convert-standalone-to-replica-set>`.

   * - Replica Set
     - Replica Set
     - :icon:`check-square`
     - 

   * - Replica Set
     - Sharded {+Cluster+}
     - :icon:`check-square`
     - When you run this type of migration, you may specify sharding parameters.
       To learn more, see the live migration procedure in this section
       and this :ref:`sharding example <c2c-example-shards-live-migration>`.

   * - Sharded {+Cluster+}
     - Sharded {+Cluster+}
     - :icon:`check-square`
     - The number of shards in source and destination {+clusters+} might differ.
       The source sharded {+cluster+} must use CSRS (Config Server Replica Sets).
       To learn more, see :ref:`replset-config-servers`.

   * - Sharded {+Cluster+}
     - Replica Set
     - :icon-fa5:`minus`
     - 