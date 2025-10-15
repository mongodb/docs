.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-migration-page.rst   
      
   .. step:: Start the migration process.
      
      a. Click :guilabel:`Migrate from a Self-Managed MongoDB Database`.
      
         .. note::

            The UI label mentions |onprem|, however, for this procedure, you
            can only migrate clusters running MongoDB 6.0 or later to |service|
            that |mms| monitors.
      
      #. Click :guilabel:`I'm Ready to Start`.
      
      |service| displays a Live Migration wizard with instructions on how
      to proceed with the process. The process pushes the data from your
      source {+cluster+} to the new destination {+cluster+}. After you complete
      the wizard steps, you can point your application to the new {+cluster+}.
      
   .. step:: Link with Atlas.
      
      a. Click :guilabel:`Generate Link-Token`. |service| displays the
         page for generating a link-token.
      
      #. Click :guilabel:`Next` to see a page that contains the generated link-token.
      
      #. Copy the link-token and store it in a secure location. |service|
         never displays the contents of the link-token. |service| also does
         not display the link-token after generating it. Do not
         share it publicly.
      
         .. note::
            Use one unique link-token for live migrating all
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
      
      #. Click :guilabel:`Migrate from a Self-Managed MongoDB Database`.
         
         .. note::
          
            The UI label mentions |onprem|, however, for this procedure, you
            can only migrate to |service| clusters running MongoDB 6.0 or later 
            to |service| that |mms| monitors.
         
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
      
         - If your destination {+cluster+} has data that you want to preserve,
           keep the :guilabel:`Clear any existing data on your destination cluster`
           option unchecked. The live migration service checks a sample of documents
           during validation and warns you if it finds duplicate namespaces.
           If you want to delete the existing data, check this option and
           then enter the name of the destination {+cluster+}.

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

         Once the migration process begins, |service| UI displays the
         :guilabel:`Migrating Data` walk-through screen for the destination
         |service| {+cluster+}. The walk-through screen updates as the
         destination {+cluster+} proceeds through the migration process.
         The migration process includes:

         - Applying new writes to the source {+cluster+} data to the destination
           {+cluster+} data.
         - Copying data from the source {+cluster+} to the destination {+cluster+}.
         - Finalizing the migration on the destination {+cluster+}.

         A lag time value displays during the final phase of the migration process
         that represents the current lag between the source and destination {+clusters+}.

         When the lag timer is close to zero and the migration process is caught up,
         |service| activates the :guilabel:`Cutover to your destination cluster` button
         and indicates that your source and destination {+clusters+} are in sync.
         Proceed to the next step.
      
   .. step:: Perform the cutover.

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
        |service| confirms that source and destination clusters are in sync. Proceed
        with the cutover process. If the sync time expires, you can retry the migration.

        .. include:: /includes/import/migration-email-expiration.rst

      a. Click :guilabel:`I'm ready to cutover`. Proceed with the three-step cutover
         process quickly to ensure minimal downtime to your application.

      b. Click :guilabel:`Proceed to cutover`. The three-step cutover process begins:

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
            page displays. |service| shows the status of the synced changes,
            the application downtime, the duration of the migration process,
            the amount of initial data copied, and the number of copied collections. 

            - Verify that your data is transferred to the destination {+cluster+}
              by comparing document counts and running hash comparisons.
              To learn more, see |mongosync-verification|.

            - Click :guilabel:`Connect to your new cluster`. |service| redirects you
              to the :guilabel:`Connect to Atlas` page, where you can choose a connection method.
            - After you connect to your cluster, resume writes to the destination {+cluster+}.
