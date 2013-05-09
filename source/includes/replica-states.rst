.. list-table::
   :header-rows: 1
   :widths: 15,25,60

   * - **Number**
     - **Name**
     - **State**

   * - 0
     - ``STARTUP``
     - Start up, phase 1 (parsing configuration.) Not eligible to vote.

   * - 1
     - ``PRIMARY``
     - Primary. Eligible to vote.

   * - 2
     - ``SECONDARY``
     - Secondary. Eligible to vote.

   * - 3
     - ``RECOVERING``
     - Member is recovering (initial sync, post-rollback, stale members.) Eligible to vote.

   * - 4
     - ``FATAL``
     - Member has encountered an unrecoverable error. Not eligible to vote.

   * - 5
     - ``STARTUP2``
     - Start up, phase 2 (forking threads.) Not eligible to vote.

   * - 6
     - ``UNKNOWN``
     - Unknown (the set has never connected to the member.) Not eligible to vote.

   * - 7
     - ``ARBITER``
     - Member is an :term:`arbiter`. Eligible to vote.

   * - 8
     - ``DOWN``
     - Member is not accessible to the set. Not eligible to vote.

   * - 9
     - ``ROLLBACK``
     - Member is rolling back data. See :term:`rollback`. Eligible to vote.

   * - 10
     - ``SHUNNED``
     - Member has been removed from replica set. Not eligible to vote.
