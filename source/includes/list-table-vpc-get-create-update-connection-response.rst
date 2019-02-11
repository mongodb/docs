.. list-table::
   :header-rows: 1
   :widths: 15 10 75

   * - Element
     - Type
     - Description

   * - ``accepterRegionName``
     - string
     - Specifies the region where the peer |vpc| resides. 
       For complete lists of supported regions, see:

       - :doc:`Amazon Web Services </reference/amazon-aws/>`
       - :doc:`Google Cloud Platform </reference/google-gcp/>`

   * - ``awsAccountId``
     - string
     - Account ID of the owner of the peer |vpc|.

   * - ``connectionId``
     - The peering connection ID.

   * - ``containerId``
     - string
     - Unique identifier of the |service| |vpc| container for the
       region.

   * - ``errorStateName``
     - string
     - Error state, if any. 

       .. include:: /includes/vpc-peering-error.rst 

   * - ``id``
     - string
     - Unique identifier for the peer rconnection. This is specific to
       and used by |service|.

   * - ``providerName``
     - string
     - Cloud provider for this |vpc| peering connection. Accepted
       values include |aws| and |gcp|.

   * - ``routeTableCidrBlock``
     - string
     - The peer VPC CIDR block or subnet.

   * - ``statusName``
     - string
     - 
       .. include:: /includes/vpc-peering-status.rst

   * - ``vpcId``
     - string
     - Unique identifier of the peer |vpc|.
