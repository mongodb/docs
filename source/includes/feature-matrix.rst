.. list-table::
   :widths: 60 30 30
   :header-rows: 1

   * - Feature
     - Commercial |service|
     - |cloudgov-short|

   * - Free/ shared tier clusters
     - :icon-fa5:`check`
     -

   * - ``M10`` clusters
     - :icon-fa5:`check`
     -

   * - AWS GovCloud regions
     -
     - :icon-fa5:`check`

   * - Cross-region clusters
     - :icon-fa5:`check`
     - :icon-fa5:`check` [#cross-region]_

   * - Private Link for GovCloud
     - 
     - :icon-fa5:`check`

   * - VPC Peering for GovCloud
     -
     - :icon-fa5:`check`

   * - ``SCRAM-SHA1`` database authentication
     - :icon-fa5:`check`
     -

   * - ``SCRAM-SHA256`` database authentication
     - :icon-fa5:`check`
     - :icon-fa5:`check`

   * - AWS IAM database authentication
     - :icon-fa5:`check`
     - :icon-fa5:`check`

   * - AWS IAM (GovCloud) database authentication
     -
     - :icon-fa5:`check`

   * - Backup for FedRAMP Moderate regions
     - :icon-fa5:`check` [#fr-moderate-backup]_
     - :icon-fa5:`check` [#fr-moderate-backup]_

   * - Backups for |aws-fr-high| regions
     -
     - :icon-fa5:`check` [#govcloud-backup]_

   * - |service| Data Federation
     - :icon-fa5:`check`
     -

   * - |service| Data Lake
     - :icon-fa5:`check`
     -   

   * - |service| Online Archives
     - :icon-fa5:`check`
     - 

   * - |service| Search
     - :icon-fa5:`check`
     - :icon-fa5:`check`

   * - |service| Triggers
     - :icon-fa5:`check`
     - 

   * - MongoDB Charts
     - :icon-fa5:`check`
     - 

   * - MongoDB Realm
     - :icon-fa5:`check`
     - 

.. [#cross-region]
   
   You cannot deploy clusters across government 
   and standard regions in the same project.

.. [#fr-moderate-backup]

   |cloudgov-short| backups for |aws-fr-moderate| deployments are 
   stored in |aws-fr-moderate| regions.

.. [#govcloud-backup]

   |cloudgov-short| backups for |aws-fr-high| deployments are stored 
   in |aws-fr-high| regions.
