.. list-table::
   :widths: 35 65

   * - :guilabel:`Auth Schema Version`

     - Specifies the schema for storing user data. MongoDB 3.0 uses a
       different schema for user data than previous versions. For
       compatibility information, see the :manual:`MongoDB Release Notes
       </release-notes/3.0-compatibility/#security-changes>`.

   * - :guilabel:`Eligible Server RegExp`

     - Specifies the servers to which |mms| deploys MongoDB. To let |mms|
       select from any of your provisioned servers, enter a period
       (\".\"). To select a specific set of servers, enter their common
       prefix. To use your local machine, enter the machine name.

   * - :guilabel:`Config Server Replica Set Name`

     - If you deploy a sharded cluster on MongoDB 3.2 or higher, the config
       servers deploy as a replica set. This field specifies the name for
       the replica set.

   * - :guilabel:`Member Options`

     - Configures replica set members. By default, each member is a voting
       member that bears data. You can configure a member as an
       :manual:`arbiter </core/replica-set-arbiter>`, :manual:`hidden
       </core/replica-set-hidden-member>`, :manual:`delayed
       </core/replica-set-delayed-member>`, or :manual:`having a certain
       priority in an election </core/replica-set-priority-0-member>`.

   * - :guilabel:`Index Configuration`

     - Creates a MongoDB index. For details, see
       :doc:`/data-explorer/indexes`.

   * - :guilabel:`Advanced Configuration Options`

     - Configures additional runtime options. For option descriptions, see
       :doc:`/reference/deployment-advanced-options`.

       .. include:: /includes/option-in-memory-storage.rst

       .. important::
          All members of a replica set do not need to use the same storage
          engine. You can deploy a replica set with members that use a mix of
          storage engines, including the 
          :manual:`in-memory storage engine </core/inmemory>`. If a member 
          using an in-memory storage engine fails or is shut down, it loses
          *all* of its data. When that member is restarted,
          it needs to :ref:`resychronize all of the data <replica-set-initial-sync>`
          from another member.
