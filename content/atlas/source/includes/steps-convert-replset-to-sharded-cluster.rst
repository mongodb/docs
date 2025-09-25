.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Enable sharding for the {+cluster+}.
      
      a. For the {+cluster+} you want to modify, click :icon-mms:`ellipsis`,
         then select :guilabel:`Edit Configuration`.
      #. Expand :guilabel:`Additional Settings` to modify your cluster 
         configuration.
      #. Enable sharding in the :guilabel:`Shard your cluster` section 
         by setting the toggle to :guilabel:`On`.
      
         :gold:`IMPORTANT:` After you convert a replica set to a sharded 
         cluster, you can't convert it again to a replica set.
         
         |service| automatically selects :guilabel:`1 Shard` from the
         drop-down menu. You can increase the number of shards in a later
         step after you restart your application clients.

         :red:`WARNING` 
         
         .. include:: /includes/fts/facts/fact-sharded-cluster-upgrade.rst

      #. Click :guilabel:`Review Changes` to review the changes to 
         billing and click :guilabel:`Apply Changes`.
      
      It may take some time for |service| to deploy the changes. Please 
      wait until |service| has converted your cluster before proceeding to 
      the next step.
      
   .. step:: Restart all application clients and reconnect to the sharded cluster.

      If you don't restart the application clients, your data might be 
      inconsistent after |service| begins distributing data across shards. 
      
      - If you are using a :manual:`DNS Seed List 
        </reference/connection-string/#dns-seed-list-connection-format>`
        connection string, your application automatically connects to the
        :binary:`mongos` for your sharded cluster after you restart your
        application.
      
      - If you are using a :manual:`standard connection string
        </reference/connection-string/#standard-connection-string-format>`,
        you must update your connection string to reflect your new cluster
        topology.
      
      - If you are using :doc:`private endpoints 
        </security-private-endpoint>` to connect to your |service| 
        {+cluster+}, your {+cluster+} experiences downtime during the
        conversion.
      
      To learn more, see :doc:`/connect-to-database-deployment`.
      
   .. step:: Increase the number of shards.
      
      a. For the cluster you want to modify, click :icon-mms:`ellipsis`,
         then select :guilabel:`Edit Configuration`.
      #. Expand :guilabel:`Additional Settings` to modify your cluster 
         configuration.
      #. Select the number of shards from the drop-down menu.
      #. Click :guilabel:`Review Changes` to review the changes to 
         billing and click :guilabel:`Apply Changes`.
      
      Sharding supports high throughput and large datasets, and you can  
      increase the number of shards as data requirements grow.
      
   .. step:: Distribute data across the shards in your cluster.

      To shard the collection whose data you want to distribute, see 
      :method:`sh.shardCollection() <sh.shardCollection>` for more 
      information.
      
      .. include:: /includes/fact-shardCollection-fts-indexes.rst
      
   .. step:: Change any cluster-wide settings.
      
      If you want to make further changes to the :term:`sharded cluster 
      <sharded cluster>`, see :ref:`scale-cluster` for more information 
      on the cluster-wide settings that you can modify. 
      
