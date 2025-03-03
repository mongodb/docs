.. procedure::
   :style: normal

   .. step:: Start the migration process.

      a. Select a destination |service| {+cluster+}.

         Navigate to the destination |service| {+cluster+} and click
         the :icon-fa5:`ellipsis-h`. On the {+cluster+} list,
         the :icon-fa5:`ellipsis-h` is beneath the {+cluster+}
         name. When you view {+cluster+} details, the :icon-fa5:`ellipsis-h`
         is on the right-hand side of the screen, next to
         the :guilabel:`Connect` and :guilabel:`Configuration` buttons.

      #. Click :guilabel:`Migrate Data to this Cluster`.

      #. |service| displays a walk-through screen with instructions on
         how to proceed with the live migration. The process syncs the data
         from your source {+cluster+} to the new destination {+cluster+}.
         After you complete the walk-through, you can point your application
         to the new {+cluster+}.

         Collect the following details for your source {+cluster+} to
         facilitate the migration:

         - The hostname and port of the source cluster's
           :manual:`primary member </core/replica-set-primary/>`.
           |service| only connects to the primary member of the source
           {+cluster+} by default. To increase resiliency and facilitate
           failover if needed, |service| obtains the IP addresses of other
           source {+cluster+} nodes if these nodes have publicly available
           DNS records.

         - The username and password used to connect to the source {+cluster+}.

         - If the source {+cluster+} uses ``TLS/SSL`` and is not using a public
           Certificate Authority (CA), prepare the source {+cluster+}
           :abbr:`CA (Certificate Authority)` file.

         Prepare the information as stated in the walk-through screen,
         then click :guilabel:`I'm Ready To Migrate`.

      #. |service| displays a walk-through screen that collects information
         required to connect to the source {+cluster+}.

         - |service| displays the IP address of the MongoDB live migration
           server responsible for your live migration at the top of the
           walk-through screen. Configure your source {+cluster+} firewall
           to grant access to the displayed IP address.

         - Enter the hostname and port of the primary member of the source
           {+cluster+} into the provided text box. For example, enter
           ``mongoPrimary.example.net:27017``.

         - If the source {+cluster+} enforces authentication, enter
           a username and password into the provided text boxes.

           See :ref:`live-import-security` for guidance on the
           user permissions required by |service| live migration.

         - If the source replica set uses ``TLS/SSL`` and is not using a
           public Certificate Authority (CA), toggle the switch
           :guilabel:`Is encryption in transit enabled?` and copy the
           contents of the source {+cluster+} CA file into the provided
           text box.

         - If you wish to drop all collections on the destination replica set
           before beginning the migration process, toggle the switch
           marked :guilabel:`Clear any existing data on your destination
           cluster?` to :guilabel:`Yes`.

      #. Click :guilabel:`Validate` to confirm that |service| can connect
         to the source replica set.

         If validation fails, check that:

         - You have :ref:`added <live-import-ip-access-list>` |service|
           to the IP access list on your source replica set.

         - The provided user credentials, if any, exist on the source
           {+cluster+} and have the required permissions.

         - The :guilabel:`Is encryption in transit enabled?` toggle is
           enabled only if the source {+cluster+} requires it.

         - The CA file provided, if any, is valid and correct.

      #. Click :guilabel:`Start Migration` to start the migration process.

         Once the migration process begins, |service| UI displays the
         :guilabel:`Migrating Data` walk-through screen for
         the destination |service| {+cluster+}.

         The walk-through screen updates as the destination {+cluster+}
         proceeds through the migration process. The migration process
         includes:

         - Copying collections from the source to the destination {+cluster+}.
         - Creating indexes on the destination {+cluster+}.
         - Tailing of oplog entries from the source {+cluster+}.

         A lag time value displays during the final oplog tailing phase
         that represents the current lag between the source and destination
         {+clusters+}. This lag time may fluctuate depending on the rate of
         oplog generation on the source {+cluster+}, but should decrease
         over time as the live migration process copies the oplog entries
         to the destination {+cluster+}.

         When the lag timer and the :guilabel:`Prepare to Cutover` button
         turn green, proceed to the next step.

   .. step:: Perform the cutover.

      When |service| detects that the source and destination {+clusters+} are
      nearly in sync, it starts an extendable 120 hour (5 day) timer to begin
      the cutover stage of the live migration procedure. If the 120 hour
      period passes, |service| stops synchronizing with the source {+cluster+}.
      You can extend the time remaining by 24 hours by clicking
      :guilabel:`Extend time` below the :guilabel:`<time> left to cut over`
      timer.

      .. include:: /includes/import/migration-email-expiration.rst
   
      a. Once you are prepared to cut your applications over to the destination
         |service| {+cluster+}, click :guilabel:`Prepare to Cutover`.
      
      b. |service| displays a series of pages, guiding you through each
         stage of the cutover process. Some of the items in the following
         list describe actions that you should do, other items describe
         the informational messages that |service| displays.
   
         i. Stop your application. This ensures that no more writes occur on
            the source {+cluster+}.

         #. |service| displays a screen with the
            following message: :guilabel:`Almost done! Waiting for Atlas
            to clean up ...`. |service| finalizes the migration. This can
            take a few hours. While finalizing the migration, |service|
            completes metadata changes, removes the MongoDB Application
            Server subnets from the destination {+cluster+}\'s IP access
            list, and removes the database user that live migration used
            to import data to the destination {+cluster+}.

            .. include:: /includes/import/migration-email-lm-in-progress.rst

         #. |service| is still finalizing the migration, but the destination
            {+cluster+} is ready to accept writes. You can restart your
            application and connect to your new |service| destination
            {+cluster+} now if you want to minimize downtime. Don't delete
            your source {+cluster+} until the migration is fully complete.

         #. .. include:: /includes/fact-legacy-live-migration-data-verification.rst

         #. Click :guilabel:`Connect to your new cluster`. |service| redirects
            you to the :guilabel:`Connect to Atlas` page, where you can
            choose a connection method.
            - Resume writes to the destination {+cluster+}. 
            - Confirm that your application is working with the destination
            |service| {+cluster+} and verify your data on the destination
            {+cluster+}.

         #. If the migration succeeds, the :guilabel:`You have successfully
            migrated to Atlas` page displays.