- You cannot select an ``M0`` free cluster or ``M2/M5`` shared cluster
  as the source or target for Live Migration. To migrate data from
  an ``M0`` free cluster or ``M2/M5`` shared cluster to a paid cluster,
  see :atlas:`Modify a Cluster </scale-cluster>`.

- The following table lists the current support status for
  :atlas:`VPC peering </security-vpc-peering>` and
  :atlas:`VPC private endpoints </security-private-endpoint>` for source
  and target clusters that you live migrate from |mms| to |service|.

  To request support for additional providers, submit a request on the
  :mdb-feedback:`MongoDB Feedback </forums/924355-ops-tools>` page.

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
       - :icon-fa5:`check` :icon-fa5:`star`
       - :icon-fa5:`minus`

     * - |gcp|
       - :icon-fa5:`minus`
       - :icon-fa5:`minus`

  :icon-fa5:`star` To enable VPC with live migration on |aws|:

  - Add the migration host's IP address or an external CIDR block to the
    |service| project's :atlas:`IP access list </security/ip-access-list>`.
    To learn more, see :atlas:`Network Access </import/migrate-from-com-rs/#network-access-for-live-migrating-from-ops-manager-or-cloud-manager>`.

  - Configure a :atlas:`VPC peering connection </security-vpc-peering>` between the
    migration host and the |service| cluster.

  - On the migration host,
    :aws:`enable DNS resolution for a VPC peering connection
    </vpc/latest/peering/modify-peering-connections.html#vpc-peering-dns>`
    in |aws|. This resolves the migration host's public hostname to the
    internal IP address.
