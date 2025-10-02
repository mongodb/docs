.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-migration-page.rst
      
   .. step:: Click :guilabel:`Migrate from Atlas` to start the migration process.

             |service| displays a walk-through screen with instructions on
             how to proceed with the live migration. The process syncs the data
             from your source {+cluster+} to the new destination {+cluster+}. After
             you complete the walk-through, you can point your application to the
             new {+cluster+}.

   .. step:: Click :guilabel:`Get Started` to set up the migration details.

      The :guilabel:`Migration from Atlas to Atlas` screen displays.

   .. step:: Configure your live migration settings in the :guilabel:`Set up Migration` screen.

      a. Connect to your source {+cluster+}.

         i. Select the source :guilabel:`Organization` from the drop-down menu.
         #. After that, select the source :guilabel:`Project` from the drop-down menu.
         #. Finally, select the source :guilabel:`Cluster` from the drop-down menu.

      #. Connect your destination {+cluster+}.

         .. note::

            You can only select a destination cluster that belongs to the organization 
            you start the migration from. Ensure you are in the same 
            organization as the destination {+cluster+} to start the migration process.

         i. Select the destination :guilabel:`Project` from the drop-down menu.
         #. Select the destination :guilabel:`Cluster` from the drop-down menu.

            The destination {+cluster+} must be a new or empty |service| {+cluster+}.
            If the destination {+cluster+} has any existing data, you can choose to delete this data
            during the migration process. If you leave this option unchecked and the destination {+cluster+} has any data
            during the migration process, the migration fails and issues a validation error.

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