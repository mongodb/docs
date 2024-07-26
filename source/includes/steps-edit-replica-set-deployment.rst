.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst
      
   .. step:: On the line listing the deployment item, click :guilabel:`Modify`.
      
   .. step:: Modify Cluster-Wide Settings.
      
      The :guilabel:`Replica Set Configuration` section contains the
      following cluster-wide configuration settings.
      
      .. list-table::
         :header-rows: 1
         :widths: 25 75
      
         * - Setting
           - Description
      
         * - :guilabel:`Auth Schema Version`
           - .. include:: /includes/extracts/deploy-replica-set-auth-schema-version.rst
      
         * - :guilabel:`Feature Compatibility Version`
           - .. include:: /includes/extracts/deploy-replica-set-feature-compatibility-version.rst
      
         * - :guilabel:`Replica Set Settings`
           - .. include:: /includes/extracts/deploy-replica-set-settings.rst
      
         * - :guilabel:`Process Name`
           - .. include:: /includes/extracts/deploy-process-name.rst
      
         * - :guilabel:`Version`
           - .. include:: /includes/extracts/deploy-version.rst
      
         * - :guilabel:`Log File`
           - .. include:: /includes/extracts/deploy-log-file.rst
      
   .. step:: Configure Each Replica Set Member.
      
      |mms| lists each replica set member under the
      :guilabel:`MongoD Settings` heading of the
      :guilabel:`Member Configuration` section. Each replica set member
      has the following configurable options:
      
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
      
         * - :guilabel:`Add a Mongod`
           - .. include:: /includes/extracts/deploy-member-configuration-add-mongod.rst
      
   .. step:: Configure your Replication Settings.
      
      The :guilabel:`Replication Settings` section contains the following
      configuration options for the replica set:
      
      .. list-table::
         :header-rows: 1
         :widths: 25 75
      
         * - Setting
           - Description
      
         * - :guilabel:`Protocol Version`
           - .. include:: /includes/extracts/deploy-member-replication-protocol-version.rst
      
         * - :guilabel:`Chaining Allowed`
           - .. include:: /includes/extracts/deploy-member-replication-chaining-allowed.rst
      
         * - :guilabel:`Write Concern Majority Journal Default`
           - .. include:: /includes/extracts/deploy-member-replication-write-concern-majority-journal-default.rst
      
         * - :guilabel:`Heartbeat Timeout (secs)`
           - .. include:: /includes/extracts/deploy-member-replication-heartbeat-timeouts.rst
      
         * - :guilabel:`Election Timeout (ms)`
           - .. include:: /includes/extracts/deploy-member-replication-election-timeout.rst
      
         * - :guilabel:`CatchUp Timeout (ms)`
           - .. include:: /includes/extracts/deploy-member-replication-catch-up-timeout.rst
      
         * - :guilabel:`CatchUp Takeover Delay (ms)`
           - .. include:: /includes/extracts/deploy-member-replication-catch-up-takeover-delay.rst
      
         * - :guilabel:`Last Error Defaults`
           - .. include:: /includes/extracts/deploy-member-replication-last-error-defaults.rst
      
         * - :guilabel:`Force Reconfigure`
           - .. include:: /includes/extracts/deploy-member-replication-force-reconfigure.rst
      
   .. step:: Modify Advanced Configuration Options.
      
   .. step:: Click :guilabel:`Save`.
      
      |mms| redirects you to the deployment page, where you must review
      your changes before deploying the updated configuration.
      
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.
   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
