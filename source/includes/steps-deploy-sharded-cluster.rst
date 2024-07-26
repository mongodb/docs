.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst
      
   .. step:: Open the Cluster Creation View.
      
      Click the :guilabel:`Add` arrow in the top-right of the
      :guilabel:`Deployment` page. Select :guilabel:`New Cluster`
      from the drop-down menu to open the :guilabel:`Create New Cluster`
      view.
      
   .. step:: Configure Cluster-Wide Settings.
      
      The :guilabel:`Cluster Configuration` section contains the following
      cluster-wide configuration settings. Settings marked with an
      :guilabel:`*` asterisk in the  |mms| UI are **required**.
      
      .. list-table::
         :header-rows: 1
         :widths: 20 80
      
         * - Setting
           - Description
      
         * - :guilabel:`Cluster Name`
           - .. include:: /includes/extracts/deploy-sharded-cluster-name.rst
      
         * - :guilabel:`Config Server Replica Set Name`
           - .. include:: /includes/extracts/deploy-sharded-csrs-name.rst
      
         * - :guilabel:`Shard Name Prefix`
           - .. include:: /includes/extracts/deploy-sharded-shard-name.rst
      
         * - :guilabel:`Process Name`
           - .. include:: /includes/extracts/deploy-sharded-process-name.rst
      
         * - :guilabel:`Version`
           - .. include:: /includes/extracts/deploy-sharded-version.rst
      
         * - :guilabel:`Data Directory`
           - .. include:: /includes/extracts/deploy-data-directory.rst
      
         * - :guilabel:`Log File`
           - .. include:: /includes/extracts/deploy-sharded-log-file.rst
      
   .. step:: Configure Each Shard in Your Cluster.
      
      From the :guilabel:`Member Configuration` section, click
      :guilabel:`Shard Settings` to open the :manual:`shard </reference/glossary/#std-term-shard>` configuration
      options. |mms| lists each shard in the cluster and the
      :binary:`~bin.mongod` processes associated to that shard.
      Each shard process has the following options:
      
      .. list-table::
         :header-rows: 1
         :widths: 20 80
      
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
           - .. include:: /includes/extracts/deploy-sharded-member-configuration-add-mongod.rst
      
      .. include:: /includes/facts/sharded-clusters/add-a-shard.rst
      
   .. step:: Configure Each Configuration Server in Your Cluster.
      
      |mms| displays a different heading for your configuration server
      settings depending on the MongoDB version you selected for your
      configuration servers.
      
      MongoDB 3.2 or Later:
        From the :guilabel:`Member Configuration` section, click
        :guilabel:`Config Server Replica Set Settings` to open
        the CSRS configuration options. Each config server
        replica set member has the following options:
      
        .. list-table::
           :header-rows: 1
           :widths: 20 80
      
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
             - .. include:: /includes/extracts/deploy-sharded-member-configuration-add-mongod.rst
      
      MongoDB 3.0 or Earlier
        From the :guilabel:`Member Configuration` section, click
        :guilabel:`Config Server Settings` to open the configuration
        server options. Each configuration server has the following
        options:
      
        .. list-table::
           :header-rows: 1
           :widths: 20 80
      
           * - Setting
             - Description
      
           * - :guilabel:`Hostname`
             - .. include:: /includes/extracts/deploy-member-configuration-hostname.rst
      
           * - :guilabel:`Port`
             - .. include:: /includes/extracts/deploy-member-configuration-port.rst
      
   .. step:: Configure Each ``mongos`` in Your Cluster.
      
      From the :guilabel:`Member Configuration` section, click
      :guilabel:`Mongos Settings` to open the :binary:`~bin.mongos`
      configuration options. Each :binary:`~bin.mongos` process has the
      following options:
      
      .. list-table::
         :header-rows: 1
         :widths: 20 80
      
         * - Setting
           - Description
      
         * - :guilabel:`Hostname`
           - .. include:: /includes/extracts/deploy-sharded-member-configuration-hostname.rst
      
         * - :guilabel:`Port`
           - .. include:: /includes/extracts/deploy-sharded-member-configuration-port.rst
      
         * - :guilabel:`Add a Mongos`
           - .. include:: /includes/extracts/deploy-sharded-member-configuration-add-mongos.rst
      
   .. step:: Configure Each Replica Set in your Cluster.
      
      The :guilabel:`Replication Settings` section contains the following
      configuration options for each replica set in the cluster:
      
      .. list-table::
         :header-rows: 1
         :widths: 20 80
      
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
      
   .. step:: Set the default read and write concerns for your MongoDB replica set.
      
   .. step:: Set any advanced configuration options for your MongoDB sharded cluster.
      
   .. step:: Click :guilabel:`Create Cluster`.
      |mms| redirects you to the :guilabel:`Deployment` view, where you
      must review the cluster configuration before |mms| begins deployment.
      
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.
   .. step:: Review and approve your changes.
      
      |mms| displays your proposed changes.
      
      a. If you are satisfied, click :guilabel:`Confirm & Deploy`.
      b. If you want to make further configuration changes, 
         click :guilabel:`Cancel`. Click :guilabel:`Modify` for the
         cluster to make additional changes.
