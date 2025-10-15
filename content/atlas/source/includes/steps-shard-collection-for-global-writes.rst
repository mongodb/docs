.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-data-explorer.rst
      
   .. step:: Click the collection that you want to shard.
      
   .. step:: Click the :guilabel:`Global Writes` tab.
      
   .. step:: Enter the second field of the compound shard key in :guilabel:`Second shard key field`.
      
   .. step:: Expand :guilabel:`Advanced Shard Key Configuration` section to specify how to shard the collection.

      You can choose one of the following options:
      
      .. include:: /includes/list-table-advanced-shard-key-config.rst
      
      To learn more about these options, see 
      :ref:`Global Cluster Sharding Reference <global-cluster-sharding>`.
      
   .. step:: Click :guilabel:`Shard Collection`.
