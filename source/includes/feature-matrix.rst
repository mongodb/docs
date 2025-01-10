.. list-table::
   :widths: 60 30 30
   :header-rows: 1

   * - Feature
     - Commercial |service|
     - |cloudgov-short|

   * - |service| Data Federation
     - :icon-fa5:`check`
     -

   * - |service| Data Lake
     - :icon-fa5:`check`
     -   

   * - |service| Device SDKs
     - :icon-fa5:`check`
     - 

   * - |service| Online Archives
     - :icon-fa5:`check`
     - 

   * - |service| Search
     - :icon-fa5:`check`
     - :icon-fa5:`check`

   * - |service| Stream Processing
     - :icon-fa5:`check`
     -

   * - |service| Triggers
     - :icon-fa5:`check`
     - 

   * - |service| Vector Search
     - :icon-fa5:`check`
     - :icon-fa5:`check`

   * - AWS IAM database authentication
     - :icon-fa5:`check`
     - :icon-fa5:`check`

   * - AWS IAM (GovCloud) database authentication
     -
     - :icon-fa5:`check`

   * - AWS GovCloud regions
     -
     - :icon-fa5:`check`

   * - Backups for |aws-fr-high| regions
     -
     - :icon-fa5:`check` [#govcloud-backup]_

   * - Backup for FedRAMP Moderate regions
     - :icon-fa5:`check` [#fr-moderate-backup]_
     - :icon-fa5:`check` [#fr-moderate-backup]_

   * - |bic-short-no-link|
     - :icon-fa5:`check`
     - :icon-fa5:`check`

   * - Cross-region clusters
     - :icon-fa5:`check`
     - :icon-fa5:`check` [#cross-region]_

   * - Free, Flex, and Shared clusters
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

   * - ``M10`` clusters
     - :icon-fa5:`check`
     -

   * - MongoDB Charts
     - :icon-fa5:`check`
     - 

   * - Private Link for GovCloud
     - 
     - :icon-fa5:`check`

   * - Prometheus Integration
     - :icon-fa5:`check`
     -

   * - Push logs to AWS S3
     - :icon-fa5:`check`
     -  

   * - ``SCRAM-SHA1`` database authentication
     - :icon-fa5:`check`
     -

   * - ``SCRAM-SHA256`` database authentication
     - 
     - :icon-fa5:`check`

   * - Serverless instances
     - :icon-fa5:`check`
     -

   * - VPC Peering for GovCloud
     -
     - :icon-fa5:`check`

.. [#govcloud-backup]

   |cloudgov-short| backups for |aws-fr-high| deployments are stored 
   in |aws-fr-high| regions.

.. [#fr-moderate-backup]

   |cloudgov-short| backups for |aws-fr-moderate| deployments are 
   stored in |aws-fr-moderate| regions.

.. [#cross-region]
   
   You cannot deploy clusters across government 
   and standard regions in the same project.

.. [#global-clusters]
   
   You can enable Global Writes on an |service| cluster by 
   :atlas:`creating a Global Cluster </tutorial/create-global-cluster/>`.
