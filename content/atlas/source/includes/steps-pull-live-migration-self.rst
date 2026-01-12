.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-migration-page.rst
      
   .. step:: Click :guilabel:`Migrate from Self-Managed` to start the migration process.

             |service| displays a walk-through screen with instructions on
             how to proceed with the live migration. The process syncs the data
             from your source {+cluster+} to the new destination {+cluster+}. After
             you complete the walk-through, you can point your application to the
             new {+cluster+}.

   .. step:: Click :guilabel:`Get Started` to set up the migration details.

      The :guilabel:`Migrate from Self-Managed MongoDB Database to Atlas` screen displays.

   .. step:: Configure your live migration settings in the :guilabel:`Set up Migration` screen.

      a. Input your MongoDB :guilabel:`Connection String` to connect to your source {+cluster+}.

         .. note::

            Live Migration does not support connection string in 
            :ref:`SRV Connection Format <connections-dns-seedlist>`. Live Migration validation only
            accepts :ref:`Standard Connection String Format <connections-standard-connection-string-format>`.

         The connection string includes the database authentication username and password used to connect
         to the source {+cluster+}. For replica sets, the database user must
         have the :authrole:`readAnyDatabase`, :authrole:`backup` roles and
         :authaction:`bypassWriteBlockingMode` action.
         For sharded {+clusters+}, the database user must
         have the :authrole:`readAnyDatabase`, :authrole:`backup`, :authrole:`clusterMonitor` roles and :authaction:`bypassWriteBlockingMode` action.

         - A replica set {+cluster+} :ref:`standard connection string <connections-standard-connection-string-format>` 
           for a cluster name ``replica`` and that includes three ``mongod`` 
           instances, looks like the following example:

           .. code-block:: none

              mongodb://<db_username>:<db_password>@replica-shard-00-00.AA000.example.net:27017,replica-shard-00-01.AA000.example.net:27017,replica-shard-00-02.AA000.example.net:27017/?tls=true&replicaSet=atlas-example-shard-0&authSource=admin&appName=replica

         - A sharded {+cluster+} :ref:`standard connection string <connections-standard-connection-string-format>`
           for a cluster name ``sharded`` and with a configuration of two shards,
           looks like the following example:

           .. code-block:: none

              mongodb://<db_username>:<db_password>@sharded-config-00-00.AA000.example.net:27016,sharded-config-00-01.AA000.example.net:27016,sharded-config-00-02.AA000.example.net:27016,sharded-shard-00-00.AA000.example.net:27016,sharded-shard-00-01.AA000.example.net:27016,sharded-shard-00-02.AA000.example.net:27016/?tls=true&authSource=admin&appName=sharded

         If the source {+cluster+} uses ``TLS/SSL`` and isn't using a public
         Certificate Authority (CA), you will need the source {+cluster+}
         :abbr:`CA (Certificate Authority)` file.

      #. Connect your destination cluster.

         i. Select the destination :guilabel:`Project` from the drop-down menu.
         #. Select the destination :guilabel:`Cluster` from the drop-down menu.

            The destination {+cluster+} must be a new or empty |service| {+cluster+}.
            If the destination {+cluster+} has any existing data, you can choose to delete this data
            during the migration process. If you leave this option unchecked and the destination {+cluster+} has any data
            during the migration process, the migration fails and issues a validation error.

      #. Allow IP addresses.

         If your source {+cluster+} has IP access list enabled, add the
         MongoDB live migration server IP addresses to the source {+cluster+}
         IP access list. You can find the IP addresses in the walk-through screen.

         Add only the specific IP addresses from the UI to your access list. 
         Do not configure your source {+cluster+} to allow access from anywhere (0.0.0.0/0), 
         as this exposes it to the entire internet.

         If your source {+cluster+} does not have IP access list enabled,
         you can skip this step.

      #. Configure additional settings.

         - |service| displays a checkbox for
           :guilabel:`Verify data post-migration (recommended)`. If you check
           this option, |service| automatically verifies supported data after the
           migration. If you leave this option unchecked, you must run the full data
           verification manually instead. To learn more, see :ref:`verify-migrations`.

         - If your destination {+cluster+} has any existing data, and you check the option
           :guilabel:`Clear any existing data on your destination cluster?`,
           |service| deletes the existing data. If you leave this option unchecked and
           the destination {+cluster+} has any data with conflicting namespaces during the
           migration process, the migration fails and issues a validation error.

         - .. include:: /includes/import/sharding-and-index-config.rst

   .. step::  Click :guilabel:`Continue` to validate your data.

      a. The :guilabel:`Continue` button changes to :guilabel:`Validating...` 
         while |service| validates the information you provided.

         If the validation fails, check that:

         - You have :ref:`added <live-import-c2c-ip-access-list>` |service|
           to the IP access list on your source {+cluster+}.
         - The provided user credentials, if any, exist on the source {+cluster+}
           and have the required permissions.
         - The CA file provided, if any, is valid and correct.
         - |service| displays the IP address of the MongoDB live migration server
           responsible for your live migration at the top of the walk-through
           screen. Configure your source {+cluster+} firewall to grant access
           to the displayed IP address.
         - See :ref:`live-import-c2c-security` for guidance on the
           user permissions required by |service| live migration.

      #. After validation completes, click :guilabel:`Continue` again.

   .. step::  Review the information you provided in the :guilabel:`Review & Confirm` screen.

      If you need to change any information, click :guilabel:`Back` to return
      to the previous step and make your changes.

      a. Click :guilabel:`Start Migration`.

         A modal appears to confirm that you want to start the migration.

   .. step::  Click :guilabel:`Start Migration` in the modal to start the migration process.

      Once the migration process begins, |service| UI displays the
      :guilabel:`Migrating Data` walk-through screen for the destination
      |service| {+cluster+}. The walk-through screen updates as the
      destination {+cluster+} proceeds through the migration process.
      The migration process includes:

      - Applying new writes to the source {+cluster+} data to the destination
        {+cluster+} data.
      - Copying data from the source {+cluster+} to the destination {+cluster+}.
      - Finalizing the migration on the destination {+cluster+}.
      - Running the verification process, if you enabled it. If you started
        the migration with the :guilabel:`Verify data post-migration (recommended)`
        setting enabled, |service| notifies you that it performed data
        verification for supported types. If you started the migration
        with verification disabled, |service| asks you to verify your data
        manually instead. To learn more, see :ref:`verify-migrations`.

      A lag time value displays during the final phase of the migration process
      that represents the current lag between the source and destination {+clusters+}.

      You receive an email notification when your expiration window is nearly up.

      When the lag behind source is close to zero and the migration process is caught up,
      |service| activates the :guilabel:`Cutover to your destination cluster` button
      and indicates that your source and destination {+clusters+} are in sync.
      Proceed to the next step.

   .. step::  Perform the cutover.

      Cutover is a three-step process of directing your application's reads and writes
      away from your source cluster and to your destination cluster. 

      When |service| detects that the source and destination {+clusters+} are
      nearly in sync, it starts an extendable 120 hour (5 day) timer to begin
      the cutover stage of the live migration procedure. After the 120 hour
      period passes, |service| stops synchronizing with the source {+cluster+}.

      At this stage in the migration process, you can proceed to cutover or
      extend the syncing period and then proceed to cutover.

      - If you click :guilabel:`I'm ready to cutover`, |service| starts the cutover process.
      - If you click :guilabel:`Extend Sync`, and if the extended sync completes successfully,
        |service| confirms that source and destination clusters are in sync.
        Proceed with the cutover process. If the sync time expires, you can retry the migration.

        .. include:: /includes/import/migration-email-expiration.rst

      a. Click :guilabel:`I'm ready to cutover`. Proceed with the three-step cutover
         process quickly to ensure minimal downtime to your application.
   
      #. Click :guilabel:`Proceed to cutover`. The three-step cutover process begins:

         i. Stop writes to your source {+cluster+}. Click
            :guilabel:`I confirm that I've stopped writes to my source cluster`.
            Click :guilabel:`Finalize migration` to proceed.
            
         #. Wait a few minutes while |service| finalizes the migration. 
            |service| performs these actions to complete the process:

            - Removes the MongoDB live migration server subnets from the IP access
              list on the destination {+cluster+}.
            - Removes the database user that live migration used to import data
              to the destination {+cluster+}.

            .. include:: /includes/import/migration-email-lm-in-progress.rst

         #. If the migration succeeds, the :guilabel:`You have successfully migrated to Atlas`
            page displays.
            |service| shows the status of the synced changes, the application downtime,
            the duration of the migration process, the amount of initial data copied,
            and the number of copied collections.

            - Verify that your data is transferred to the destination {+cluster+}
              by comparing document counts and running hash comparisons.
              To learn more, see |mongosync-verification|.

            - Click :guilabel:`Connect to your new cluster`. |service| redirects you
              to the :guilabel:`Connect to Atlas` page, where you can choose a connection method.
            - After you connect to your cluster, resume writes to the destination {+cluster+}.