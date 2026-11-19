.. list-table::
   :widths: 60 30 30
   :header-rows: 1

   * - Feature
     - Commercial |service|
     - AtlasGov

   * - API authentication (API keys and service accounts)
     - :icon-fa5:`check`
     - :icon-fa5:`check`

   * - Atlas Agent Engine
     - :icon-fa5:`check` [#public-preview]_
     -

   * - Atlas Ephemeral Clusters
     - :icon-fa5:`check` [#public-preview]_
     -

   * - Atlas Infinite
     - :icon-fa5:`check` [#public-preview]_
     -

   * - |service| Data Federation
     - :icon-fa5:`check`
     -

   * - |service| Device SDKs
     - :icon-fa5:`check`
     -

   * - |service| Online Archives
     - :icon-fa5:`check`
     -

   * - |fts|
     - :icon-fa5:`check`
     - :icon-fa5:`check` [#search-azure-gov]_

   * - |service| Stream Processing
     - :icon-fa5:`check`
     -

   * - |service| Triggers
     - :icon-fa5:`check`
     -

   * - |avs|
     - :icon-fa5:`check`
     - :icon-fa5:`check` [#search-azure-gov]_

   * - AWS IAM database authentication
     - :icon-fa5:`check`
     - :icon-fa5:`check`

   * - AWS IAM (GovCloud) database authentication
     -
     - :icon-fa5:`check`

   * - AWS GovCloud regions
     -
     - :icon-fa5:`check`

   * - |azure-gov| regions
     -
     - :icon-fa5:`check` [#azure-gov-m20]_

   * - Backups for {+fedramp-d+} regions
     -
     - :icon-fa5:`check` [#class-d-backup]_

   * - Backup Compliance Policy
     - :icon-fa5:`check`
     - :icon-fa5:`check`

   * - Cross-region clusters
     - :icon-fa5:`check`
     - :icon-fa5:`check` [#cross-region]_

   * - Voyage AI
     - :icon-fa5:`check`
     -

   * - Free and Flex clusters
     - :icon-fa5:`check`
     -

   * - Global Clusters
     - :icon-fa5:`check` [#global-clusters]_
     -

   * - |gaw|
     -
     - :icon-fa5:`check`

   * - GCP Private Service Connect
     - :icon-fa5:`check`
     - :icon-fa5:`check`

   * - Gen2 Clusters [#gen2-clusters]_
     - :icon-fa5:`check`
     - :icon-fa5:`check`

   * - Intelligent Workload Management
     - :icon-fa5:`check`
     -

   * - ``M10`` clusters
     - :icon-fa5:`check`
     -

   * - ``M20`` clusters
     - :icon-fa5:`check`
     - Not in |azure-gov| regions [#azure-gov-m20]_

   * - MongoDB Charts
     - :icon-fa5:`check`
     -

   * - Private Link
     - :icon-fa5:`check`
     - :icon-fa5:`check`

   * - Prometheus Integration
     - :icon-fa5:`check`
     -

   * - Push logs to AWS S3
     - :icon-fa5:`check`
     -

   * - Queryable Encryption
     - :icon-fa5:`check`
     - :icon-fa5:`check`

   * - ``SCRAM-SHA1`` database authentication
     - :icon-fa5:`check`
     -

   * - ``SCRAM-SHA256`` database authentication
     -
     - :icon-fa5:`check`

   * - VPC Peering
     - :icon-fa5:`check`
     - :icon-fa5:`check`

.. [#public-preview]

   Available in Public Preview; not recommended for production
   deployments during preview.

.. [#search-azure-gov]

   |fts| and |avs| are unavailable in |azure-gov| regions.

.. [#azure-gov-m20]

   |cloudgov-short| doesn't support the ``M20`` cluster tier in
   |azure-gov| regions. ``M30`` is the minimum cluster tier
   for |azure-gov| deployments.

.. [#class-d-backup]

   You can restore |cloudgov-short| backups for {+fedramp-d+}
   deployments only to clusters in projects designated for
   {+fedramp-d+} regions. Cross-cloud restore is supported among
   |aws-fr-high|, |gaw|, and |azure-gov| regions.

.. [#cross-region]

   You cannot deploy clusters within the same project across
   both {+fedramp-d+} and {+fedramp-c+} regions.

.. [#global-clusters]

   You can enable Global Writes on an |service| cluster by
   :atlas:`creating a Global Cluster </tutorial/create-global-cluster/>`.

.. [#gen2-clusters]

   Commercial |service| supports Gen2 clusters on both |aws| and |gcp|.
   AtlasGov supports Gen2 clusters on only |aws|.

