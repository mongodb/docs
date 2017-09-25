.. list-table::
   :widths: 20 20 30 30
   :header-rows: 1
   
   * -
     - Free Tier Cluster (``M0``)
     - Shared Starter Cluster (``M2`` and ``M5``)
     - Dedicated Cluster (``M10`` and larger)
          
   * - Storage
     - 512 MB
     - ``M2``: 2 GB, ``M5``: 5 GB
     - 10 - 1000 GB

   * - Data Visualization
     - No
     - No
     - |service| :ref:`Data Explorer <data-explorer>`
   
   * - Metrics
   
     - Limited
     - Limited
     - :doc:`Full metrics </monitor-cluster-metrics>`, including the 
       :ref:`Real Time Performance Tab <real-time-metrics-status-tab>`
       
   * - VPC Peering (:ref:`amazon-aws` clusters only)
     - No
     - No
     - :ref:`VPC Peering Connection wizard <vpc-peering>`
     
   * - Global Region Selection
     - No, Free Tier clusters are deployed in a US-based :abbr:`AWS
       (Amazon Web Services)` datacenter.
     - |service| supports deploying ``M2`` and ``M5`` clusters in a
       subset of regions in AWS, GCP, and Azure.
     - |service| supports deploying clusters globally on 
       :doc:`Amazon Web Services </reference/amazon-aws>`, 
       :doc:`Google Cloud Platform </reference/google-gcp>`, and 
       :doc:`Microsoft Azure </reference/microsoft-azure>`
     
   * - Backups
     - No
     - No
     - Yes, including :doc:`queryable backups </query-backup>`
     
   * - Sharding
     - No
     - No
     - Yes, for clusters using an ``M30+`` instance
     
   * - Dedicated Instance
     - No, ``M0`` Free Tier clusters run in a shared environment
     - No, ``M2`` and ``M5`` clusters run in a shared environment
     - Yes, ``M10+`` clusters deploy each :program:`mongod` process to its
       own instance. 

   * - Performance Advisor
     - No
     - No
     - Yes