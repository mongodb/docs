|service| uses the specified |cidr| block for all other Network Peering
connections created in the project. The |service| |cidr| block must be
at least a ``/24`` and at most a ``/21`` in one of the following :rfc:`private networks <rfc1918#section-3>`.

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

|service| locks this value for all regions if an ``M10`` or greater
cluster or a Network Peering connection already exists in that project.  

To modify the |cidr| block, the target project cannot have:

- Any ``M10`` or greater clusters
- Any other |vpc| peering connections

Alternatively, :ref:`create a new project <atlas-create-atlas-project>`
and create a Network Peering Connection to set the desired |service| 
Network Peering |cidr| block for that project.

.. important::

   |service| limits the number of MongoDB nodes per Network Peering
   connection based on the |cidr| block and the region selected for the project.
   Contact :website:`MongoDB Support </contact>` for any questions on
   |service| limits of MongoDB nodes per Network Peering connection.
