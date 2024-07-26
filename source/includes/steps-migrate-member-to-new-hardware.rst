.. procedure::
   :style: normal
      
   .. step:: Provision the new server.

      See :doc:`/tutorial/nav/add-servers`.
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
      
   .. step:: Click :guilabel:`Modify` for the replica set cluster.
      
   .. step:: Add a member to the replica set.

      In the :guilabel:`Member Configuration` section, click
      :guilabel:`Add a Mongod` to add a new :binary:`~bin.mongod` member.
      
      |mms| displays the following configuration settings for the
      :binary:`~bin.mongod`:
      
      .. list-table::
         :header-rows: 1
         :widths: 25 75
      
         * - Setting
           - Description
      
         * - :guilabel:`Member`
           - .. include:: /includes/extracts/deploy-member-configuration-member.rst
      
         * - :guilabel:`Hostname`
           - .. include:: /includes/extracts/deploy-member-configuration-hostname.rst
      
         * - :guilabel:`Port`
           - .. include:: /includes/extracts/deploy-member-configuration-port.rst
      
         * - :guilabel:`Votes`
           - .. include:: /includes/extracts/deploy-member-configuration-votes.rst
      
         * - :guilabel:`Priority`
           - .. include:: /includes/extracts/deploy-member-configuration-priority.rst
      
         * - :guilabel:`Delay`
           - .. include:: /includes/extracts/deploy-member-configuration-delay.rst
      
         * - :guilabel:`Build Indexes`
           - .. include:: /includes/extracts/deploy-member-configuration-build-indexes.rst
      
         * - :guilabel:`Tags`
           - .. include:: /includes/extracts/deploy-member-configuration-tags.rst
      
      Ensure you select the :guilabel:`Hostname` that corresponds to the
      newly provisioned server.
      
   .. step:: Configure the new ``mongod`` process.
      
      From the :guilabel:`Replica Set Configuration` section, view the
      table under the :guilabel:`Replica Set Settings` heading. The
      :guilabel:`Process Name` column lists the hostname and port of each
      replica set member set. |mms| initially groups the processes under
      the replica set name. Click the :icon:`caret-right` icon to the left
      of the replica set name to list all members associated to the replica
      set.
      
      Configure the following settings for the
      :guilabel:`Process Name` that corresponds to the newly added member:
      
      .. list-table::
         :header-rows: 1
         :widths: 25 75
      
         * - Setting
           - Description
      
         * - :guilabel:`Version`
           - .. include:: /includes/extracts/deploy-version.rst
      
         * - :guilabel:`Data Directory`
           - .. include:: /includes/extracts/deploy-data-directory.rst
      
         * - :guilabel:`Log File`
           - .. include:: /includes/extracts/deploy-log-file.rst
      
   .. step:: Click :guilabel:`Apply`.

   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
      
   .. step:: Verify that the new member has synchronized.

      On the :guilabel:`Deployment` page, click the name of the replica
      set to open the cluster view. Verify that the
      :manual:`status </reference/replica-states>` for each
      new member is no longer in the ``Recovering`` state.
      
   .. step:: Remove the old member from the replica set.
      
      1. From the :guilabel:`Deployment` view, click :guilabel:`Modify`. 
      #. Navigate to the :guilabel:`Member Configuration` section.
      #. Click the :icon:`ellipsis-h` ellipses button for the member you want 
         to remove.
      #. From the menu, select :guilabel:`Remove from Replica Set`.
      
      .. important::
      
         Removing the :manual:`primary </reference/glossary/#std-term-primary>` replica set member triggers
         an :manual:`election </core/replica-set-elections/>`. The
         replica set cannot process write operations until the election
         completes. For complete documentation on replica set elections,
         see :manual:`Replica Set Elections </core/replica-set-elections>`.
      
      Click :guilabel:`Save` to return to the :guilabel:`Deployment`
      screen. 
      
      Click :guilabel:`Review Changes` and then click
      :guilabel:`Confirm & Deploy`. |mms| converts the removed
      replica set member to a standalone cluster visible in the
      :guilabel:`Deployment` view.
      
   .. step:: Shut down the old member.
      
      From the :guilabel:`Deployment` view, click the standalone's ellipsis 
      icon and select :guilabel:`Shutdown`. Click :guilabel:`Review Changes` 
      and then click :guilabel:`Confirm & Deploy`.
      
   .. step:: Remove the old member.

      To remove the member from |mms| management, click the
      :guilabel:`...` ellipses icon and select 
      :guilabel:`Remove from Cloud Manager`.
      
      |mms| does not automatically shut down a process removed from
      management. If you did not shut down the process in the previous
      step, you must do so manually by connecting directly to the host
      machine.
      
      For complete documentation on removing processes from |mms| 
      management, see :doc:`/tutorial/unmanage-deployment`.
