.. list-table::
   :header-rows: 1

   * - Parameter
     - Required/Optional
     - Description

   * - ``acceptorRegionName``
     - Required
     - Specifies the AWS region where the peer VPC resides. See
       `Amazon Web Services <https://docs.atlas.mongodb.com/reference/amazon-aws/>`_
       for a complete list of AWS regions supported by |service|.

   * - ``awsAccountId``
     - Required.
     - The AWS account ID of the owner of the peer VPC.
       
   * - ``containerId``
     - Required
     - The ``id`` of the |service| VPC container for the AWS region. 
       
       You can create a |service| VPC container using the
       :doc:`POST /api/atlas/v1.0/groups/{GROUP-ID}/containers
       </reference/api/vpc-create-container>` endpoint. You cannot create more
       than one container per AWS region. 
       
       To retrieve a list of container IDs, use the 
       :doc:`GET /api/atlas/v1.0/groups/{GROUP-ID}/containers
       </reference/api/vpc-get-containers-list>` endpoint.

   * - ``routeTableCidrBlock``
     - Required.
     - The peer VPC CIDR block or subnet.

   * - ``vpcId``
     - Required.
     - The ID of the peer VPC.
     
