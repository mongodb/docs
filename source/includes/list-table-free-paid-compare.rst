.. list-table::
   :widths: 20 40 40
   :header-rows: 1
   
   * -
     - Free Tier Cluster (``M0`` instance)
     - Paid Cluster (``M10+`` instance)
     
   * - Scaling
     - No
     - :doc:`Seamless cluster scaling </scale-cluster>`
     
   * - Data Visualization
     - No
     - |service| :ref:`Data Explorer <data-explorer>`
   
   * - Metrics
   
     - Limited
     - :doc:`Full metrics </monitor-cluster-metrics>`, including the 
       :ref:`Real Time Performance Tab <real-time-metrics-status-tab>`
       
   * - VPC Peering
     - No
     - :ref:`VPC Peering Connection wizard <vpc-peering>`
     
   * - Global Region Selection
     - No
     - All major :doc:`AWS regions </reference/amazon-aws>`
     
   * - Backups
     - No
     - Yes, including :doc:`queryable backups </query-backup>`
     
   * - Sharding
     - No
     - Yes, for clusters using an ``M30+`` instance
     
   * - Dedicated Instance
     - No, ``M0`` Free Tier clusters run in a shared environment
     - Yes, ``M10+`` clusters deploy each :program:`mongod` process to its
       own instance. 