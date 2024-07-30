.. procedure::
   :style: normal
   
   .. include:: /includes/nav/steps-org-settings.rst

   .. include:: /includes/nav/steps-org-live-migration.rst   
      
   .. step:: Start the migration process.
      
      a. Click :guilabel:`Migrate from Ops Manager or Cloud Manager`.
      
         .. note::

            The UI label mentions |onprem|, however, for this procedure, you
            can only migrate to |service| MongoDB deployments {+c2c-version+} or later
            that |mms| monitors.
      
      #. Click :guilabel:`I'm Ready to Start`.
      
      |service| displays a Live Migration wizard with instructions on how
      to proceed with the process. The process pushes the data from your
      source {+cluster+} to the new destination {+cluster+}. After you complete
      the wizard steps, you can point your application to the new {+cluster+}.
      
   .. step:: Link with Atlas.
      
      a. Click :guilabel:`Generate Link-Token`. |service| displays the
         page for generating a :term:`link-token`.
      
      #. Click :guilabel:`Next` to see a page that contains the generated link-token.
      
      #. Copy the link-token and store it in a secure location. |service|
         never displays the contents of the link-token. |service| also does
         not display the link-token after generating it. Do not
         share it publicly.
      
         .. note::
            Use one unique :term:`link-token` for live migrating all
            projects in one |mms| organization to |service|.
      
      #. Click :guilabel:`Done`.
      
   .. step:: Paste the link-token into Cloud Manager.
      
      a. Access the organization in |mms|:
      
         Open |mms|, and navigate to the organization
         whose project's {+cluster+} you are live migrating to |service|.
      
      #. Click :guilabel:`Settings` in the left navigation panel.
      
      #. In the :guilabel:`Live Migration: Connect to Atlas` section, click
         :guilabel:`Connect to Atlas`. The :guilabel:`Connect to Atlas`
         dialog box opens.
      
      #. Paste the link-token you generated in the previous step of the
         Live Migration wizard and click :guilabel:`Connect to Atlas`.
         |mms| establishes the connection to |service|. Use the
         :guilabel:`Refresh` button to send an update to |service|, if
         needed.
      
   .. step:: Create the destination Atlas cluster.
      
      If you haven't already, create a destination {+cluster+} in |service|.
      See :ref:`migrate-from-c2c-push-prereqs`.
      
   .. step:: Initiate the migration from the destination cluster.
      
      a. Click :guilabel:`Select Target Cluster from Projects`.
      
      #. Go to your destination |service| cluster's project and find your
         destination cluster.
      
      #. Click :icon-fa5:`ellipsis-h` and select :guilabel:`Migrate Data to this Cluster`
         from the dropdown list to start the migration.
         The :guilabel:`Migrate Data to This Cluster` page opens.
      
      #. Click :guilabel:`Migrate from Ops Manager or Cloud Manager`.
         
         .. note::
          
            The UI label mentions |onprem|, however, for this procedure, you
            can only migrate to |service| MongoDB deployments {+c2c-version+} or later
            that |mms| monitors.
         
         Fill in the fields as follows:
      
         - Select the source project in |mms|, if it's not already selected.
         - Select the source {+cluster+} from the dropdown.
      
         - .. include:: /includes/import/sharding-and-index-config.rst
      
         - Select a migration host for handling the migration.
         - If you aren't using a private endpoint, review the
           IP address access list and check that the migration host's
           external IP address is included in this list. If it's not added,
           add it now:
      
           - Click :guilabel:`Set Network Access for Host`
           - Click :guilabel:`+ Add IP Address`
           - Return to the Live Migration wizard. Select the source
             cluster from the dropdown and choose
             :guilabel:`Migrate data to this cluster` under :icon-fa5:`ellipsis-h`.
      
         - Select the source {+cluster+} from the drop-down.
      
         - If the source {+cluster+} enforces authentication, enter a username and
           password into the provided text boxes.
      
           See :ref:`live-import-c2c-security` for guidance on the
           user permissions required by |service| live migration.
      
         - If you suspend the source {+cluster+} from automation in |mms|, but
           continue to monitor the source {+cluster+} with the Monitoring Agent,
           the :guilabel:`Username` and :guilabel:`Password` display. If
           your deployment requires user authentication, provide the user
           name and password in these fields. The database user whose
           credentials you provide must have at least the
           :manual:`backup role
           </reference/built-in-roles/#mongodb-authrole-backup>` on
           the admin database and must be authenticated using
           :manual:`both SCRAM-SHA-1 and SCRAM-SHA-256 </core/security-scram/>`.
      
         - If the source cluster uses |tls-ssl|, toggle the
           :guilabel:`Is encryption in transit enabled?` button.
      
         - If the source cluster uses |tls-ssl| with a custom Root
           Certificate Authority (CA), copy the path to the
           :abbr:`CA (Certificate Authority)` file from your migration host
           and paste this path into the provided text box. The file must be
           present on the migration host to ensure the migration host can
           read the certificate. |service| checks that the certificate is
           present and readable.
      
         - If your destination {+cluster+} has data, and you
           want to preserve it, keep the
           :guilabel:`Clear any existing data on your destination cluster` option
           unchecked. The live migration service warns you if it finds duplicate
           namespaces. If you want to delete the existing data, check this
           option.
      
         - Choose a connection to connect to the {+cluster+}. The
           :guilabel:`Standard connection` always shows as available in
           the UI. However, other connection options are enabled only if
           you have previously configured a VPC peering connection or a
           private endpoint for your {+clusters+}. If |service| detects that
           you don't have VPC connections or private endpoints configured,
           these options are grayed out.
         
           - If you aren't using VPC peering or a private endpoint, click
             :guilabel:`Standard connection` and proceed to the
             :guilabel:`Validation` stage of this step.
      
           - If you configured a :ref:`VPC peering connection <vpc-peering>`
             between the migration host and the |service| replica set, the
             :guilabel:`VPC Peering` option is active. Click
             :guilabel:`VPC Peering` to connect using VPC peering for live
             migration. If the :guilabel:`VPC Peering` option is grayed out,
             :ref:`configure a VPC peering connection <vpc-peering>` before
             starting this procedure. To learn more, see
             :ref:`migrate-push-c2c-vpc-support`.
      
           - If you configured a :ref:`private endpoint <private-endpoint>`
             between the migration host and the |service| {+cluster+}, the
             :guilabel:`Private Endpoint` option is active. Click
             :guilabel:`Private Endpoint` to connect with a
             :ref:`private endpoint <private-endpoint>`, and then select
             a previously-configured private endpoint from the dropdown.
             Only private endpoints that are in ``AVAILABLE`` state are valid.
             If the :guilabel:`Private Endpoint` option is grayed out,
             :ref:`configure a private endpoint <private-endpoint>`
             before starting this procedure. To learn more, see
             :ref:`migrate-push-c2c-vpc-support`.
      
             .. note::
      
                .. include:: /includes/fact-private-endpoint-limitations-c2c-push-live-migration.rst
      
         - Click :guilabel:`Validate`. The validation process verifies that
           your migration host is reachable, and performs the following
           validation checks to ensure that you can start live migration
           to |service|.
      
           To take advantage of the following validation checks,
           :cloudmgr:`upgrade the MongoDB Agent in Cloud Manager 
           </tutorial/update-mongodb-agent-from-automation-agent/>` to
           the latest version.
           The following validation checks run during the live migration:
      
           - The migration host can connect to the destination {+cluster+}.
           - If the source cluster uses |tls-ssl| with a custom Root
             Certificate Authority (CA), the migration host can access
             the source cluster using |tls-ssl|.
           - The database user credentials are valid. This validation check
             runs only if you suspend the source cluster from automation in
             |mms|, but continue to monitor the source cluster with the
             Monitoring Agent.
      
           - The migration process validates that the destination {+cluster+}
             has enough disk space based on the storage size of the compressed
             data. To learn more about data and storage sizes, see
             :manual:`dbStats </reference/command/dbStats/#output>`.
      
         - If validation fails, check the migration host, the validity of
           your external IP addresses or |cidr| block, and the link-token.
           Also check the database user credentials, your |tls-ssl|
           certificates, and the amount of disk storage size on the destination
           {+cluster+}.
         - If validation succeeds, click :guilabel:`Next`.
      
   .. step:: Start the migration.
      
      a. Review the report listing your source organization, project and
         cluster, and the migration host that the live migration process
         will use.
      #. Click :guilabel:`Start the Migration`.
      
   .. step:: Prepare to Cut Over.
      
      When the lag timer and the :guilabel:`Prepare to Cutover` button
      turn green, click it to proceed to the next step.
      
   .. step:: Perform the cutover.
      
      When |service| detects that the source and destination {+clusters+} are
      nearly in sync, it starts an extendable 120 hour (5 day) timer to begin
      the cutover stage of the live migration procedure. After the 120 hour period
      passes, |service| stops synchronizing with the source {+cluster+}. You
      can extend the time remaining by 24 hours by clicking
      :guilabel:`Extend time` below the :guilabel:`<time> left to cut over` timer.
      
      a. Click :guilabel:`Prepare to Cutover`. |service| displays a walk-through
         screen that states: :guilabel:`Your migration is almost complete!`
         The walk-through screen displays the following instructions on how to
         proceed with the cutover process:
      
         1. Stop your application. This ensures that no more writes occur on
            the source {+cluster+}.
         2. Wait for the optime gap to reach zero. When the counter reaches
            zero, the source and destination {+clusters+} are in sync.
         3. Check the box that states: :guilabel:`I confirm that I am ready to
            cut over the application to the destination cluster. By proceeding,
            Atlas will finalize the migration. This process will take a few seconds.
            Once it is complete you can point your application at the destination
            cluster and begin writing to it.`
      
      b. Click :guilabel:`Cutover`.
         |service| completes the migration and displays the :guilabel:`Connect` page.
      
      c. Decide when to resume writes on the destination {+cluster+}. You can do one of the following:
      
         - Wait for the banner on your {+cluster+} card to state:
           :guilabel:`Your cluster migration is complete` and then resume writes
           on the destination {+cluster+}. If you choose to wait for the migration
           to complete, your application experiences a temporary pause in writes
           during the time period needed to finalize the migration.
      
           or
      
         - Begin application's writes to the destination {+cluster+} without
           waiting for the migration to complete, while your {+cluster+} card
           banner states: :guilabel:`Your destination cluster in Atlas is ready to accept writes, but we are still finalizing the migration.`
           If you choose to move writes to the destination {+cluster+} without
           waiting until the end of the migration process, and live migration fails
           in the final stages and issues an error, you must redirect writes
           back to your source {+cluster+} and restart the live migration process.
      
      d. When you are ready to redirect writes to the destination {+cluster+} in |service|:
      
         i. Use the destination {+cluster+}'s connection string to connect to your application.
         #. Confirm that your application is working with the destination |service| {+cluster+}.
         #. Verify that your data is transferred to the destination {+cluster+}
            by comparing document counts and running hash comparisons.
            To learn more, see |c2c-verification|.
         #. Resume writes to the destination {+cluster+}.

      |service| performs these actions to complete the process:
      
      - Removes the MongoDB live migration server subnets from the IP access
        list on the destination {+cluster+}.
      - Removes the database user that live migration used to import data
        to the destination {+cluster+}.
      - Marks the migration process as complete.
