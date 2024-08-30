.. procedure::
   :style: normal

   .. step:: Start the migration process.

      a. Select a destination |service| {+cluster+}.

         Navigate to the destination |service| {+cluster+} and click
         the :icon-fa5:`ellipsis-h`. On the {+cluster+} list,
         the :icon-fa5:`ellipsis-h` is beneath the {+cluster+} name.
         When you view {+cluster+} details, the :icon-fa5:`ellipsis-h`
         is on the right-hand side of the screen, next to
         the :guilabel:`Connect` and :guilabel:`Configuration` buttons.

      #. Click :guilabel:`Migrate Data to this Cluster`.

      #. |service| displays a walk-through screen with instructions on
         how to proceed with the live migration. The process
         syncs the data from your source {+cluster+} to the new destination
         {+cluster+}. After you complete the walk-through, you can point your
         application to the new {+cluster+}.

         Collect the following details for your source {+cluster+} to
         facilitate the migration:

         - |service| displays the IP address of the MongoDB live migration
           server responsible for your live migration at the top of the
           walk-through screen. Configure your source {+cluster+} firewall
           to grant access to the displayed IP address.

         - Enter the hostname and port of any :binary:`mongos <bin.mongos>`
           of the source sharded {+cluster+} into the provided text box.
           For example, ``mongos.example.net:27017``.

         - If the source {+cluster+} enforces authentication, enter
           a username and password into the provided text boxes.

           See :ref:`live-import-sharded-security` for guidance on the
           user permissions required by |service| live migration.

         - If the source {+cluster+} uses ``TLS/SSL`` and is not using
           a public Certificate Authority (CA), toggle the switch
           :guilabel:`Is encryption in transit enabled?` and copy
           the contents of the source {+cluster+} CA file into
           the provided text box.

      #. Click :guilabel:`Validate` to confirm that |service| can connect
         to the source {+cluster+}.

         If validation fails, check that:

         - You have granted the Live Migration servers
           :ref:`network access <live-import-ip-access-list>`
           on your source {+cluster+} firewall.

         - The provided user credentials, if any, exist on the source {+cluster+}
           and have the required permissions.

         - The :guilabel:`Is encryption in transit enabled?` toggle is enabled
           only if the source {+cluster+} requires it.

         - The CA file provided, if any, is valid and correct.

         - The provided hostnames are valid and reachable over the public
           internet.

      #. Click :guilabel:`Start Migration` to start the migration process.

         |service| displays the live migration progress in the UI. During
         live migration, you can't view metrics or access data for the
         destination {+cluster+}.

         A lag time value is displayed during the final oplog tailing phase
         that represents the current lag between the source and destination
         {+clusters+}. This lag time may fluctuate depending on the rate of
         oplog generation on the source, but should decrease over time as
         oplog entries are copied to the destination {+cluster+}.

         Click :guilabel:`View Progress per Shard` to view the sync progress
         and migration time remaining per shard. If the initial sync process
         for a given shard fails, you can try to restart the sync by clicking
         :guilabel:`Restart`.

         When the lag timer and the :guilabel:`Prepare to Cutover` button
         turn green, proceed to the next step.

   .. step:: (Optional) Test the destination {+cluster+}.

      If you wish to skip testing and complete the migration, proceed to step 3.

      If you wish to do a dry run of the migration process and test the
      destination {+cluster+} for performance and data integrity, you may
      click the :guilabel:`Cancel` button at this point. The source {+cluster+}
      stops syncing data with the destination {+cluster+}, but all the
      transferred data remains, so you can test your applications with
      the new {+cluster+}.

      When your testing is complete and you're ready to perform the complete
      migration process, begin again from step 1. All the databases and
      collections which were created during the test run will be deleted and
      rebuilt.

   .. step:: Perform the cutover.

      Cutover is a three-step process of directing your application's reads
      and writes away from your source {+cluster+} and to your destination
      {+cluster+}.

      .. note:: Staging Migration

         If you are creating a staging environment to test your
         applications, note the :guilabel:`optime gap` to identify how far
         behind your staging environment will be compared with your source
         {+cluster+}.

         Press :guilabel:`Cancel` to cancel the live migration. |service|
         terminates the migration at that point in time, leaving migrated
         data in place. |service| displays
         the :guilabel:`Sharded Cluster Live Import in Progress` message
         for the destination {+cluster+} until the {+cluster+} is ready
         for normal access. To learn more,
         see :ref:`Canceling Live Migration <live-import-sharded-cancel>`.
         Once the cancellation is complete, you can test your staging
         application against the partially migrated data.

      a. When |service| detects that the source and destination {+clusters+}
         are nearly in sync, it starts an extendable 120 hour (5 day) timer
         to begin the cutover stage of the live migration procedure.
         If the 120 hour period passes, |service| stops synchronizing with
         the source {+cluster+}. You can extend the time remaining by
         24 hours by clicking :guilabel:`Extend time` below
         the :guilabel:`<time> left to cut over` timer.

         .. important::

            The cutover procedure requires stopping your application and
            all writes to the source {+cluster+}. Consider scheduling and
            announcing a maintenance period to minimize interruption of service
            on the dependent applications.
  
      #. Once you are prepared to cut your applications over to the
         destination |service| {+cluster+}, click :guilabel:`Prepare to Cutover`.
         |service| displays a walk-through screen with instructions
         on how to proceed with the cutover. The :guilabel:`optime gap`
         displays how far behind the destination {+cluster+} is compared
         to the source {+cluster+}. You must stop your application and
         all writes to the source {+cluster+} to allow the destination
         {+cluster+} to close the :guilabel:`optime gap`.

         |service| displays a series of pages, guiding you through each
         stage of the cutover process. Some of the items in the following
         list describe actions that you should do, other items describe
         the informational messages that |service| displays.

         i. Stop your application. This ensures that no more writes occur
            on the source {+cluster+}.
      
         #. |service| displays a screen with the following message:
            :guilabel:`Almost done! Waiting for Atlas to clean up ...`.
            |service| finalizes the migration. This can take a few hours.
            While finalizing the migration, |service| completes metadata
            changes, removes the MongoDB Application Server subnets from
            the destination {+cluster+}\'s IP access list, and removes the
            database user that live migration used to import data to the
            destination {+cluster+}.

            |service| is still finalizing the migration, but the destination
            {+cluster+} is ready to accept writes. You can restart your
            application and connect to your new |service| destination
            {+cluster+} now if you want to minimize downtime. Don't delete
            your source {+cluster+} until the migration is fully complete.

            - Click :guilabel:`Connect to your new cluster`. |service| redirects
              you to the :guilabel:`Connect to Atlas` page, where you can
              choose a connection method.
            - Resume writes to the destination {+cluster+}. 
            - Confirm that your application is working with the destination
              |service| {+cluster+} and verify your data on the destination
              {+cluster+}.

         #. If the migration succeeds, the :guilabel:`You have successfully
            migrated to Atlas` page displays.