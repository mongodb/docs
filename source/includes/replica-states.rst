.. list-table::
   :header-rows: 1
   :widths: 15,25,60

   * - **Number**
     - **Name**
     - **State Description**

   * - 0
     - :replstate:`STARTUP`

     - Cannot vote. All members start up in this state. The
       :program:`mongod` parses the :doc:`replica set configuration document </administration/replica-set-member-configuration>` while in :replstate:`STARTUP`.

   * - 1
     - :replstate:`PRIMARY`
     - Can vote. The :doc:`primary </core/replica-set-primary>` is the only member to accept write operations.

   * - 2
     - :replstate:`SECONDARY`
     - Can vote. The :doc:`secondary </core/replica-set-secondary>` replicates the data store.

   * - 3
     - :replstate:`RECOVERING`
     - Can vote. Members either perform startup self-checks, or transition
       from completing a :doc:`rollback </core/replica-set-rollbacks>` or :doc:`resync </tutorial/resync-replica-set-member>`.

   * - 4
     - :replstate:`FATAL`
     - Cannot vote. Has encountered an unrecoverable error.

   * - 5
     - :replstate:`STARTUP2`
     - Cannot vote. Forks replication and election threads before
       becoming a secondary.

   * - 6
     - :replstate:`UNKNOWN`
     - Cannot vote. Has never connected to the replica set.

   * - 7
     - :replstate:`ARBITER`
     - Can vote. :ref:`Arbiters <replica-set-arbiters>` do not replicate
       data and exist solely to participate in elections.

   * - 8
     - :replstate:`DOWN`
     - Cannot vote. Is not accessible to the set.

   * - 9
     - :replstate:`ROLLBACK`
     - Can vote. Performs a :doc:`rollback </core/replica-set-rollbacks>`.

   * - 10
     - :replstate:`SHUNNED`
     - Cannot vote. Was once in the replica set but has now been removed.
