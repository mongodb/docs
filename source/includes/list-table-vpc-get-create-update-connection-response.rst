.. list-table::
   :header-rows: 1

   * - Field
     - Description

   * - ``acceptorRegionName``

     - Specifies the AWS region where the peer VPC resides. The return
       value is ``null`` if the region is the same region in which the
       |service| VPC resides.

   * - ``awsAccountId``
     - The AWS account ID of the owner of the peer VPC.

   * - ``connectionId``
     - The peering connection ID.

   * - ``containerId``

     - The ``id`` of the |service| VPC container for the AWS region.

   * - ``errorStateName``

     - The error state, if any. 

       .. include:: /includes/vpc-peering-error.rst 

   * - ``id``

     - |service| assigned unique ID for the connection. Only specific to and used by |service|.

   * - ``routeTableCidrBlock``

     - The peer VPC CIDR block or subnet.

   * - ``statusName``
     - The status.

       .. include:: /includes/vpc-peering-status.rst

   * - ``vpcId``
     - The ID of the peer VPC.
