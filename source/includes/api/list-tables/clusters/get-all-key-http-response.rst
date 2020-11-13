.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 66

   * - Name
     - Type
     - Description

   * - clusters
     - array of objects
     - Objects that describe the clusters in each project that the API
       key is authorized to view.

   * - clusters[n].alertCount
     - integer
     - Number of open alerts.

   * - clusters[n].authEnabled
     - boolean
     - Flag that indicates whether |service| requires authenticationto
       access the nodes in the cluster.

       |service| returns ``true``.

   * - clusters[n].availability
     - string
     -  Availability of the cluster. Values include:

        - ``available``: All nodes in the cluster are available.
        - ``warning``: Some nodes in the cluster are available. At
          least one node is unavailable.
        - ``unavailable``: The cluster is unavailable. The cluster
          does not have a primary node.
        - ``dead``: The cluster is inactive.

   * - clusters[n].backupEnabled
     - boolean
     - Flag that indicates whether backup is enabled for the cluster.

   * - clusters[n].clusterId
     - string
     - Unique identifier of the |service| cluster.

   * - clusters[n].dataSizeBytes
     - number
     - Total size of the data stored on each node in the cluster in
       bytes.

   * - clusters[n].name
     - string
     - Name of the cluster as it appears in |service|.

   * - clusters[n].nodeCount
     - integer
     - Number of nodes in the cluster.

   * - clusters[n].sslEnabled
     - boolean
     - Flag that indicates whether |ssl| authentication is required to
       access the nodes in the cluster.

       |service| returns ``true``.

   * - clusters[n].type
     - string
     - Type of MongoDB cluster.

       - ``replica set``: :term:`replica set`
       - ``sharded cluster``: :term:`sharded cluster`

   * - clusters[n].versions
     - array of strings
     - Version of MongoDB that each node in the cluster is running.

   * - groupId
     - string
     - Unique identifier of the project.

   * - groupName
     - string
     - Name of the project to which the returned clusters belong.

   * - orgId`
     - string
     - Unique identifier for the organization that owns the project to
       which the returned clusters belong.

   * - orgName
     - string
     - Name of the organization that owns the project to which the
       returned clusters belong.

   * - planType
     - string
     - Plan type.

       |service| returns ``Atlas``.

   * - tags
     - array of strings
     - Tags applied to the project.

       |service| returns an empty array.
