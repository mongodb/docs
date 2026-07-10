.. list-table::
   :widths: 30 70
   :stub-columns: 1

   * - Default
     -

       .. list-table::
          :widths: 50 50
          :stub-columns: 1
          :header-rows: 1

          * - Deployment Type
            - Default Write Concern

          * - Standalone
            - Journaled

          * - Replica sets or sharded clusters
            - W2

   * - Journaled
     - A :term:`primary` or :term:`standalone` MongoDB instance
       acknowledged the write and wrote that write to their on-disk
       :term:`journals <journal>`.

   * - Acknowledged
     - A primary or standalone acknowledged the write.

   * - W2
     - More than one of the cluster members acknowledged the write.

   * - Majority
     - A majority of the replica set members acknowledged the write.
