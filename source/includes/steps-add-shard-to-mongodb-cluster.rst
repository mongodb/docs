.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
      
   .. step:: Select the :guilabel:`Clusters` view for your deployment.
      
   .. step:: Click :guilabel:`Modify` on the cluster where you want to add a shard.
      
   .. step:: In the :guilabel:`Member Configuration` section, add a shard.
      
      a. Expand :guilabel:`SHARD SETTINGS`.
      
      b. Click :guilabel:`Add a Shard` to add :binary:`~bin.mongod` processes 
         to the shard.
      
         To add additional :binary:`~bin.mongod` processes to the shard, 
         click the :guilabel:`Add a Mongod` link.
      
   .. step:: Review and update settings for the new shard as needed:
      
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
         
      
   .. step:: Click :guilabel:`Save` to add the new shard to the cluster.
