.. list-table::
   :header-rows: 1
   :widths: 15 10 75

<<<<<<< 3e76dc1bcbe039737291a206fc0909a4a34d3f26
   * - Element
=======
   * - Body Parameter
>>>>>>> (DOCSP-4286): Updated VPC GET endpoints.
     - Type
     - Description

   * - ``accepterRegionName``
     - string
<<<<<<< 3e76dc1bcbe039737291a206fc0909a4a34d3f26
     - Specifies the region where the peer |vpc| resides. 
       For complete lists of supported regions, see:

       - :doc:`Amazon Web Services </reference/amazon-aws/>`
       - :doc:`Google Cloud Platform </reference/google-gcp/>`

   * - ``awsAccountId``
     - string
     - Account ID of the owner of the peer |vpc|.
=======
     - |aws| region where the peer |vpc| resides. Returns ``null`` if
       the region is the same region in which the |service| |vpc|
       resides.

   * - ``awsAccountId``
     - string
     - |aws| account ID of the owner of the peer |vpc|.
>>>>>>> (DOCSP-4286): Updated VPC GET endpoints.

   * - ``connectionId``
     - string
     - Unique identifier for the peering connection.

   * - ``containerId``
     - string
<<<<<<< 3e76dc1bcbe039737291a206fc0909a4a34d3f26
     - Unique identifier of the |service| |vpc| container for the
=======
     - Unique identifier of the |service| |vpc| container for the |aws|
>>>>>>> (DOCSP-4286): Updated VPC GET endpoints.
       region.

   * - ``errorStateName``
     - string
     - Error state, if any. 

       .. include:: /includes/vpc-peering-error.rst 

   * - ``id``
     - string
<<<<<<< 3e76dc1bcbe039737291a206fc0909a4a34d3f26
     - Unique identifier for the peer rconnection. This is specific to
       and used by |service|.
=======
     - |service| assigned unique ID for the connection. Only specific
       to and used by |service|.
>>>>>>> (DOCSP-4286): Updated VPC GET endpoints.

   * - ``providerName``
     - string
     - Cloud provider for this |vpc| peering connection. Accepted
<<<<<<< 3e76dc1bcbe039737291a206fc0909a4a34d3f26
       values include |aws| and |gcp|.

   * - ``routeTableCidrBlock``
     - string
     - The peer VPC CIDR block or subnet.
=======
       values are |aws| and |gcp|.

   * - ``routeTableCidrBlock``
     - string
     - Peer |vpc| |cidr| block or subnet.
>>>>>>> (DOCSP-4286): Updated VPC GET endpoints.

   * - ``statusName``
     - string
     - 
       .. include:: /includes/vpc-peering-status.rst

   * - ``vpcId``
     - string
     - Unique identifier of the peer |vpc|.
