|service| uses the specified |cidr| block for all other network peering
connections created in the project. You can't create peering connection 
if a peer with an overlapping |cidr| block already exists. The 
|service| |cidr| block must be at least ``/24`` and at most ``/21`` in 
one of the following :rfc:`private networks <rfc1918#section-3>`.

.. list-table::
   :header-rows: 1
   :widths: 40 40 20

   * - Lower Bound
     - Upper Bound
     - Prefix

   * - ``10.0.0.0``
     - ``10.255.255.255``
     - 10/8

   * - ``172.16.0.0``
     - ``172.31.255.255``
     - 172.16/12

   * - ``192.168.0.0``
     - ``192.168.255.255``
     - 192.168/16

|service| locks this value for a given region if an ``M10`` or greater
cluster or a network peering connection already exists in that region.  

To modify the |cidr| block, the target project cannot have:

- Any ``M10`` or greater clusters with nodes in the target region
- Any cloud backup snapshots stored in the target region
- Any other |vpc| peering connections to the target region

Alternatively, :ref:`create a new project <atlas-create-atlas-project>`
and create a network peering connection to set the desired |service| 
network peering |cidr| block for that project.

:gold:`IMPORTANT:` |service| limits the number of MongoDB nodes per Network Peering
connection based on the |cidr| block and the region selected for the project. 
Contact :website:`MongoDB Support </contact>` for any questions on 
|service| limits of MongoDB nodes per |vpc|.
