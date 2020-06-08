.. list-table::
   :widths: 15 20 30 30
   :header-rows: 1

   * -
     - Free Tier Cluster (``M0``)
     - Shared Starter Cluster (``M2`` and ``M5``)
     - Dedicated Cluster (``M10`` and larger)

   * - Storage (Data Size + Index Size)
     - | 512 MB

     - | ``M2``: 2 GB
       | ``M5``: 5 GB

     - | 10 - 4000 GB

   * - MongoDB Version Support
     - 4.2, 4.4
     - 4.2, 4.4
     - 3.6, 4.0, 4.2, 4.4

   * - Metrics and Alerts

     - Limited
     - Limited
     - :doc:`Full metrics </monitor-cluster-metrics>`, including the
       :ref:`Real Time Performance Tab <real-time-metrics-status-tab>`,
       and full :doc:`alert configuration options</configure-alerts>`.

   * - VPC Peering
     - No
     - No
     - :ref:`VPC Peering Connection wizard <vpc-peering>`

   * - Global Region Selection
     - |service| supports deploying ``M0`` clusters in a subset of
       regions in |aws|, |gcp|, and Azure.
     - |service| supports deploying ``M2`` and ``M5`` clusters in a
       subset of regions in |aws|, |gcp|, and Azure.
     - |service| supports deploying clusters globally on
       :doc:`Amazon Web Services </reference/amazon-aws>`,
       :doc:`Google Cloud Platform </reference/google-gcp>`, and
       :doc:`Microsoft Azure </reference/microsoft-azure>`

   * - Cross-Region Deployments
     - No
     - No
     - Yes. Specify additional regions for high
       availability or local reads when :doc:`creating </tutorial/create-new-cluster>`
       or :doc:`scaling </scale-cluster>` a cluster.

   * - Backups
     - No
     - Yes, :ref:`daily backup snapshots <m2-m5-snapshots>`
     - Yes, including :doc:`queryable backups </backup/legacy-backup/backup-query>`

   * - Sharding
     - No
     - No
     - Yes, for clusters using an ``M30+`` tier

   * - Dedicated Cluster
     - No, ``M0`` Free Tier clusters run in a shared environment
     - No, ``M2`` and ``M5`` clusters run in a shared environment
     - Yes, ``M10+`` clusters deploy each :binary:`mongod` process to
       its own instance.

   * - Performance Advisor
     - No
     - No
     - Yes

   * - |bic|
     - No
     - No
     - Yes
