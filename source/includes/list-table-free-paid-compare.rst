.. list-table::
   :widths: 15 20 20 20 20
   :header-rows: 1

   * -
     - {+Free-Clusters+}
     - {+Shared-Clusters+}
     - {+Flex-Clusters+}
     - {+Dedicated-Clusters+}

   * - Storage (Data Size + Index Size)
     - | 512 MB
     - | ``M2``: 2 GB
       | ``M5``: 5 GB
     - | 5 GB
     - | 10 - 4000 GB

   * - MongoDB Version Support
     - 7.0
     - 7.0
     - 8.0
     - 5.0, 6.0, 7.0, and Latest Release

   * - Metrics and Alerts

     - Limited
     - Limited
     - Limited
     - :doc:`Full metrics </monitor-cluster-metrics>`, including the
       :ref:`Real Time Performance Tab <real-time-metrics-status-tab>`,
       and full :doc:`alert configuration options</configure-alerts>`.

   * - VPC Peering
     - No
     - No
     - No
     - :ref:`VPC Peering Connection wizard <vpc-peering>`

   * - Global Region Selection
     - A subset of regions in |aws|, |gcp|, and Azure.
     - A subset of regions in |aws|, |gcp|, and Azure.
     - A subset of regions in |aws|, |gcp|, and Azure.
     - |service| supports deploying clusters globally on
       :doc:`Amazon Web Services </reference/amazon-aws>`,
       :doc:`Google Cloud Platform </reference/google-gcp>`, and
       :doc:`Microsoft Azure </reference/microsoft-azure>`.

   * - Cross-Region Deployments
     - No
     - No
     - No
     - Yes. Specify additional regions for high
       availability or local reads when :doc:`creating </tutorial/create-new-cluster>`
       or :doc:`scaling </scale-cluster>` a cluster.

   * - Backups
     - No
     - Yes, :ref:`daily backup snapshots <m2-m5-snapshots>`
     - Yes, :ref:`daily backup snapshots <flex-snapshots>`
     - Yes, including :doc:`queryable backups </backup/legacy-backup/backup-query>`

   * - Sharding
     - No
     - No
     - No
     - Yes, for clusters using an ``M30+`` tier

   * - Dedicated Cluster
     - No, ``M0`` {+Free-clusters+} run in a shared environment
     - No, ``M2`` and ``M5`` clusters run in a shared environment
     - No, {+Flex-clusters+} run in a shared environment
     - Yes, ``M10+`` clusters deploy each :binary:`mongod` process to
       its own instance.

   * - Performance Advisor
     - No
     - No
     - No
     - Yes

   * - |bic|
     - No
     - No
     - No
     - Yes
