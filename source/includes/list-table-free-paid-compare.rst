.. list-table::
   :widths: 20 40 40
   :header-rows: 1
   
   * -
     - Free Tier Cluster (``M0`` instance)
     - Paid Cluster (``M10+`` instance)
          
   * - Data Visualization
     - No
     - |service| :ref:`Data Explorer <data-explorer>`
   
   * - Metrics
   
     - Limited
     - :doc:`Full metrics </monitor-cluster-metrics>`, including the 
       :ref:`Real Time Performance Tab <real-time-metrics-status-tab>`
       
   * - VPC Peering (:ref:`amazon-aws` clusters only)
     - No
     - :ref:`VPC Peering Connection wizard <vpc-peering>`
     
   * - Global Region Selection
     - No, Free Tier clusters are deployed in a US-based :abbr:`AWS
       (Amazon Web Services)` datacenter.
     - |service| supports deploying clusters globally on 
       :doc:`Amazon Web Services </reference/amazon-aws>`, 
       :doc:`Google Cloud Platform </reference/google-gcp>`, and 
       :doc:`Microsoft Azure </reference/microsoft-azure>`
     
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