- You cannot select an ``M0`` free cluster or ``M2/M5`` shared cluster
  as the source or target for Live Migration. To migrate data from
  an ``M0`` free cluster or ``M2/M5`` shared cluster to a paid cluster,
  see :atlas:`Modify a Cluster </scale-cluster>`.

- The following table lists the current support status for
  :atlas:`VPC peering </security-vpc-peering>` and
  :atlas:`VPC private endpoints </security-private-endpoint>` for source
  and target clusters that you live migrate from |mms| to |service|:

  .. list-table::
     :widths: 20 20 60
     :header-rows: 1

     * - Cloud Provider
       - VPC Peering
       - VPC Private Endpoints

     * - |azure|
       - :icon-fa5:`minus`
       - :icon-fa5:`minus`

     * - |aws|
       - :icon-fa5:`check`
       - :icon-fa5:`minus`

     * - |gcp|
       - :icon-fa5:`minus`
       - :icon-fa5:`minus`

  To request support for additional providers, submit a request on the
  :mdb-feedback:`MongoDB Feedback </forums/924355-ops-tools>` page.
