.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Mode
     - Description

   * - :manual:`primary </core/read-preference/#primary>`
     - App Services routes all read operations to the current replica set
       :manual:`primary node </core/replica-set-primary>`. This is the
       default read preference mode.

   * - :manual:`primaryPreferred </core/read-preference/#primaryPreferred>`
     - App Services routes all read operations to the current replica set
       :manual:`primary node </core/replica-set-primary>` if it's
       available. If the primary is unavailable, such as during an
       :manual:`automatic failover
       </replication/#automatic-failover>`, read requests are routed
       to a :manual:`secondary node </core/replica-set-secondary>`
       instead.

   * - :manual:`secondary </core/read-preference/#secondary>`
     - App Services routes all read operations to one of the current replica
       set :manual:`secondary nodes </core/replica-set-primary>`.

   * - :manual:`secondaryPreferred </core/read-preference/#secondaryPreferred>`
     - App Services routes all read operations to one of the replica set's
       available :manual:`secondary nodes
       </core/replica-set-secondary>`. If no secondary is available,
       read requests are routed to the replica set :manual:`primary
       </core/replica-set-primary>` instead.

   * - :manual:`nearest </core/read-preference/#nearest>`
     - App Services routes read operations to the :manual:`replica set member
       </core/replica-set-members>` that has the lowest network
       latency relative to the client.
