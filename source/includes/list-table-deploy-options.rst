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
       :doc:`/tutorial/create-indexes`.

   * - :guilabel:`Advanced Options`

     - Configures additional runtime options. For option descriptions, see
       :doc:`/reference/deployment-advanced-options`.

       New in MongoDB 3.0:
          You can choose which storage engine to use on all members by adding
          the :guilabel:`engine` option in :guilabel:`Advanced Options`. For
          information on storage engines, see :manual:`Storage
          </core/storage>` in the MongoDB manual.

       New in MongoDB 3.4:
          You can choose an in-memory storage engine on all members of a
          deployment by adding the :guilabel:`engine` option and setting it to
          ``inMemory`` in :guilabel:`Advanced Options`. For more information,
          see :manual:`In-Memory Storage Engine </core/inmemory>` in the
          MongoDB manual.

          .. important::

             If you run a deployment with an in-memory storage engine and a
             replica set member in that deployment fails or is shutdown, that
             member must be re-synchronized entirely.
