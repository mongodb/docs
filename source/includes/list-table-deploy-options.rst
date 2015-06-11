.. list-table::
   :widths: 35 65

   * - :guilabel:`Auth Schema Version`

     - Specifies the schema for storing user data. MongoDB 3.0 uses a
       different schema for user data than previous versions. For
       compatibility information, see the :manual:`MongoDB Release Notes
       <release-notes>`.

   * - :guilabel:`Eligible Server RegExp`

     - Specifies the servers to which |mms| deploys MongoDB. To let |mms|
       select from any of your provisioned servers, enter a period
       (\".\"). To select a specific set of servers, enter their common
       prefix. To use your local machine, enter the machine name.

   * - :guilabel:`Member Options`

     - Configures replica set members. By default, each member is a voting
       member that bears data. You can configure a member as an
       :manual:`arbiter </core/replica-set-arbiter>`, :manual:`hidden
       </core/replica-set-hidden-member>`, :manual:`delayed
       </core/replica-set-delayed-member>`, or :manual:`having a certain
       priority in an election </core/replica-set-priority-0-member>`.

   * - :guilabel:`Advanced Options`

     - Configures additional runtime options. For option descriptions, see
       :doc:`/reference/deployment-advanced-options`.

       If you run MongoDB 3.0 or higher, you can choose a storage engine
       in :guilabel:`Advanced Options` by adding the :guilabel:`engine`
       option. For information on storage engines, see :manual:`Storage
       </core/storage>` in the MongoDB manual.
