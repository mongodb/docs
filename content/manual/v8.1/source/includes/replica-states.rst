.. list-table::
   :header-rows: 1
   :widths: 15 25 60

   * - Number
     - Name
     - State Description

   * - 0
     - :replstate:`STARTUP`

     - Not yet an active member of any set. All members start up in
       this state. The :binary:`~bin.mongod` parses the :doc:`replica set
       configuration document
       </administration/replica-set-member-configuration>` while in
       :replstate:`STARTUP`.

   * - 1
     - :replstate:`PRIMARY`

     - The member in state :ref:`primary <replica-set-primary>`
       is the only member that can accept write operations. Eligible to
       vote.

   * - 2
     - :replstate:`SECONDARY`

     - A member in state :ref:`secondary <replica-set-secondary-members-ref>`
       is replicating the data store. Eligible to vote.

   * - 3
     - :replstate:`RECOVERING`

     - Members either perform startup self-checks, or transition from
       completing a :ref:`rollback <replica-set-rollbacks>` or
       :ref:`resync <resync-replica-member>`. Data is not
       available for reads from this member. Eligible to vote.

   * - 5
     - :replstate:`STARTUP2`
     - The member is running an initial sync. Eligible to vote,
       except when newly added to the replica set.

   * - 6
     - :replstate:`UNKNOWN`
     - The member's state, as seen from another member of the set, is not yet known.

   * - 7
     - :replstate:`ARBITER`
     - :ref:`Arbiters <replica-set-arbiters>` do not replicate data and exist solely to participate in elections. Eligible to vote.

   * - 8
     - :replstate:`DOWN`
     - The member, as seen from another member of the set, is unreachable.

   * - 9
     - :replstate:`ROLLBACK`
     - This member is actively performing a :ref:`rollback <replica-set-rollbacks>`.  Eligible to
       vote. Data is not available for reads from this member.

       .. include:: /includes/extracts/4.2-changes-rollback-user-ops.rst

   * - 10
     - :replstate:`REMOVED`
     - This member was once in a replica set but was subsequently removed.
