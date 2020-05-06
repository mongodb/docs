.. list-table::
   :header-rows: 1
   :widths: 15 10 75

   * - Body Parameter
     - Type
     - Description

   * - ``accepterRegionName``
     - string
     - |aws| region where the peer |vpc| resides. Returns ``null`` if
       the region is the same region in which the |service| |vpc|
       resides.

   * - ``awsAccountId``
     - string
     - |aws| account ID of the owner of the peer |vpc|.

   * - ``connectionId``
     - string
     - Unique identifier for the peering connection.

   * - ``containerId``
     - string
     - Unique identifier of the |service| |vpc| container for the |aws|
       region.

   * - ``errorStateName``
     - string
     - Error state, if any.

       .. include:: /includes/vpc-peering-error.rst

   * - ``id``
     - string
     - |cidr| block that |service| uses for the clusters in your
       project.

   * - ``routeTableCidrBlock``
     - string
     - Peer |vpc| |cidr| block or subnet.

   * - ``statusName``
     - string
     - .. include:: /includes/vpc-peering-status.rst

   * - ``vpcId``
     - string
     - Unique identifier of the peer |vpc|.
