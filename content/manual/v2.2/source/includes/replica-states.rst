.. list-table::
   :header-rows: 1
   :widths: 15,25,60

   * - **Number**
     - **Name**
     - **State**

   * - 0
     - ``STARTUP``
     - Start up, phase 1 (parsing configuration.)

   * - 1
     - ``PRIMARY``
     - Primary.

   * - 2
     - ``SECONDARY``
     - Secondary.

   * - 3
     - ``RECOVERING``
     - Member is recovering (initial sync, post-rollback, stale members.)

   * - 4
     - ``FATAL``
     - Member has encountered an unrecoverable error.

   * - 5
     - ``STARTUP2``
     - Start up, phase 2 (forking threads.)

   * - 6
     - ``UNKNOWN``
     - Unknown (the set has never connected to the member.)

   * - 7
     - ``ARBITER``
     - Member is an :term:`arbiter`.

   * - 8
     - ``DOWN``
     - Member is not accessible to the set.

   * - 9
     - ``ROLLBACK``
     - Member is rolling back data. See :term:`rollback`.

   * - 10
     - ``SHUNNED``
     - Member has been removed from replica set.
