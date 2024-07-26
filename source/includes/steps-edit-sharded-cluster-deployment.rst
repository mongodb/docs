.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst
      
   .. step:: On the line listing the deployment item, click :guilabel:`Modify`.
      
   .. step:: Configure Cluster-Wide Settings.
      
      The :guilabel:`Cluster Configuration` section contains the following
      cluster-wide configuration settings.
      
      .. list-table::
         :header-rows: 1
         :widths: 25 75
      
         * - Setting
           - Description
      
         * - :guilabel:`Shard Name Prefix`
           - .. include:: /includes/extracts/deploy-sharded-shard-name.rst
      
         * - :guilabel:`Auth Schema Version`
           - .. include:: /includes/extracts/deploy-replica-set-auth-schema-version.rst
      
         * - :guilabel:`Feature Compatibility Version`
           - .. include:: /includes/extracts/deploy-replica-set-feature-compatibility-version.rst
      
         * - :guilabel:`Process Name`
           - .. include:: /includes/extracts/deploy-sharded-process-name.rst
      
         * - :guilabel:`Version`
           - .. include:: /includes/extracts/deploy-sharded-version.rst
      
         * - :guilabel:`Log File`
           - .. include:: /includes/extracts/deploy-sharded-log-file.rst
      
   .. step:: Configure Each Shard in Your Cluster.
      
      From the :guilabel:`Member Configuration` section, click
      :guilabel:`Shard Settings` to open the :manual:`shard </reference/glossary/#std-term-shard>` configuration
      options. |mms| lists each shard in the cluster and the |mongod|
      processes associated to that shard. Each shard process has the
      following options. You cannot modify options that are greyed out:
      
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
      
      .. include:: /includes/facts/sharded-clusters/add-a-shard.rst
      
   .. step:: Configure Each Configuration Server in Your Cluster.
      
   .. step:: Configure Each ``mongos`` in Your Cluster.
      
      From the :guilabel:`Member Configuration` section, click
      :guilabel:`Mongos Settings` to open the :binary:`~bin.mongos`
      configuration options. Each :binary:`~bin.mongos` process has the
      following options. You cannot modify options that are greyed out:
      
      .. list-table::
         :header-rows: 1
         :widths: 25 75
      
         * - Setting
           - Description
      
         * - :guilabel:`Hostname`
           - .. include:: /includes/extracts/deploy-sharded-member-configuration-hostname.rst
      
         * - :guilabel:`Port`
           - .. include:: /includes/extracts/deploy-sharded-member-configuration-port.rst
      
         * - :guilabel:`Add a Mongos`
           - .. include:: /includes/extracts/deploy-sharded-member-configuration-add-mongos.rst
      
   .. step:: Configure Each Replica Set in your Cluster.
      
   .. step:: Modify Advanced Configuration Options.
      
   .. step:: Click :guilabel:`Save`.
      
      |mms| redirects you to the deployment page, where you must review
      your changes before deploying the updated configuration.
      
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.
    
   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
