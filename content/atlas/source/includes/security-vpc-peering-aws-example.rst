Consider two applications in the same |aws| account in the same
region. Each application has its own |vpc|. The |vpc|\s have
identical |cidr| blocks. These VPCs can't peer with each other. You
must configure each application's |vpc| as a peer to the |service|
|vpc|.
   
.. list-table:: 
   :header-rows: 1
   :stub-columns: 1
   :widths: 25 25 25 25

   * - Application VPC name
     - VPC CIDR block
     - Subnet Name
     - Subnet CIDR block
   * - app-tier-vpc-1
     - ``10.4.0.0/16``
     - **subnet1**
     - ``10.4.1.0/24``
   * - app-tier-vpc-2
     - ``10.4.0.0/16``
     - **subnet2**
     - ``10.4.2.0/24``

To peer each application's |vpc| to the |service| VPC before you
deploy your |service| cluster:

1. Create a network peering connection to peer |service| with your 
   first application's |vpc|.

   a. Click the :guilabel:`Peering` tab.

   #. Select :guilabel:`Peering Connection`.

   #. Select :guilabel:`AWS` and click :guilabel:`Next`.
   
   #. Complete the |aws| |vpc| fields and enter details for the first
      application's |vpc|:

      - :guilabel:`Account ID`

      - :guilabel:`VPC ID`

      - :guilabel:`VPC CIDR`

      - :guilabel:`Application VPC Region`.

   #. Type the first |cidr| block, **10.4.1.0/24**, into the
      :guilabel:`VPC CIDR` field in the :guilabel:`Atlas VPC`
      section.

   #. Click :guilabel:`Initiate Peering`.

#. Create a network peering connection to peer |service| with your 
   second application's |vpc|.

   a. Click the :guilabel:`Peering` tab.

   #. Select :guilabel:`Peering Connection`.

   #. Select :guilabel:`AWS` and click :guilabel:`Next`.
    
   #. Complete the |aws| |vpc| fields and enter details for the
      second application's |vpc|:

      - :guilabel:`Account ID`

      - :guilabel:`VPC ID`

      - :guilabel:`VPC CIDR`

      - :guilabel:`Application VPC Region`.
      
   #. Type the second |cidr| block, **10.4.2.0/24**, into the
      :guilabel:`VPC CIDR` field in the :guilabel:`Atlas VPC`
      section.

   #. Click :guilabel:`Initiate Peering`.
      
#. In |aws|, configure each of your application's |vpc|\s to route 
   back to their respective |cidr| blocks in |service|. For information,
   see :aws:`Updating your route tables for a VPC peering connection </vpc/latest/peering/vpc-peering-routing.html>`. 

   - ``app-vpc-1`` with CIDR 10.4.0.0/16 routes back to ``subnet1`` 
     in the CIDR **10.4.1.0/24**
   - ``app-vpc-2`` with CIDR 10.4.0.0/16 routes back to ``subnet2``
     in the CIDR **10.4.2.0/24**
     
When complete, the routes for ``app-vpc-1`` and ``app-vpc-2``
should match the following table:

.. list-table:: 
   :header-rows: 1
   :stub-columns: 1
   :widths: 25 25 50

   * - Network
     - Destination
     - Origin
   * - app-vpc-1
     - 10.4.0.0/16
     - local
   * - 
     - 10.4.1.0/24
     - peer to the |service| |vpc|
   * - ``app-vpc-2``
     - 10.4.0.0/16
     - local
   * - 
     - 10.4.2.0/24
     - peer to the |service| |vpc|  
