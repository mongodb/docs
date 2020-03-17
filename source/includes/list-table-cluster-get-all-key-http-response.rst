.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``clusters``
     - array of objects
     - Objects that describe the clusters in each project that the API
       key is authorized to view.

   * - ``clusters.[n].alertCount``
     - integer
     - Number of open alerts.

   * - ``clusters.[n].authEnabled``
     - boolean
     - Specifies if authentication is required to access the nodes
       in the cluster.

       In |service|, this value is always ``true``.

   * - ``clusters.[n].availability``
     - string
     -  Availability of the cluster. Values include:

        - ``available``: All nodes in the cluster are available.
        - ``warning``: Some nodes in the cluster are available. At 
          least one node is unavailable.
        - ``unavailable``: The cluster is unavailable. The cluster
          does not have a primary node.
        - ``dead``: The cluster is inactive.

   * - ``clusters.[n].backupEnabled``
     - boolean
     - Specifies if backup is enabled for the cluster.

   * - ``clusters.[n].clusterId``
     - string
     - Unique identifier of the |service| cluster.

   * - ``clusters.[n].dataSizeBytes``
     - number
     - Total size of the data stored on each node in the cluster in 
       bytes.

   * - ``clusters.[n].name``
     - string
     - Name of the cluster as it appears in |service|.

   * - ``clusters.[n].nodeCount``
     - integer
     - Number of nodes in the cluster.

   * - ``clusters.[n].sslEnabled``
     - boolean
     - Specifies if |ssl| authentication is required to access the nodes
       in the cluster.

       In |service|, this value is always ``true``.

   * - ``clusters.[n].type``
     - string
     - The type of MongoDB cluster. Values include:

       - ``replica set``: :term:`replica set`
       - ``sharded cluster``: :term:`sharded cluster`

   * - ``clusters.[n].versions``
     - array of strings
     - Version of MongoDB that each node in the cluster is running.

   * - ``groupId``
     - string
     - Unique identifier of the project.

   * - ``groupName``
     - string
     - Name of the project to which the returned clusters belong.

   * - ``orgId`` 
     - string
     - Unique identifier for the organization that owns the project to
       which the returned clusters belong.

   * - ``orgName``
     - string
     - Name of the organization that owns the project to
       which the returned clusters belong.

   * - ``planType``
     - string
     - Plan type.

       In |service|, this value is always ``Atlas``.

   * - ``tags``
     - array of strings
     - Tags applied to the project.

       In |service|, this array is always empty.
