.. list-table::
   :header-rows: 1
   :widths: 15 10 10 65

   * - Parameter
     - Type
     - Necessity
     - Description

   * - ``accepterRegionName``
     - string
     - Required
     - Specifies the region where the peer |vpc| resides. 
       For complete lists of supported regions, see :doc:`Amazon Web Services </reference/amazon-aws/>`.

   * - ``awsAccountId``
     - string
     - Required
     - Account ID of the owner of the peer |vpc|.

   * - ``containerId``
     - string
     - Required
     - Unique identifier of the |service| |vpc| container for the
       region.

       You can create an |service| |vpc| container using the
       :doc:`Create Container </reference/api/vpc-create-container>`
       endpoint. You cannot create more than one container per region.

       To retrieve a list of container IDs, use the 
       :doc:`Get list of VPC containers </reference/api/vpc-get-containers-list>` 
       endpoint.

   * - ``providerName``
     - string
     - Optional
     - Cloud provider for this |vpc| peering connection.
       If omitted, |service| sets this parameter to ``AWS``.

   * - ``routeTableCidrBlock``
     - string
     - Required
     - Peer |vpc| |cidr| block or subnet.

   * - ``vpcId``
     - string
     - Required
     - Unique identifier of the peer |vpc|.

