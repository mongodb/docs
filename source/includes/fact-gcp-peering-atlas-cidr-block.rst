|service| uses the specified |cidr| block for all other Network Peering
connections created in the project. By default, the |service| |cidr|
block must be at least an ``/18`` in one of the following 
:rfc:`private networks <1918#section-3>`.

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

If your application requires |service| to use a smaller |cidr| block,
use the |service| :ref:`API <atlas-create-peering-container-api>` to 
create an |service| network peering container with a |cidr| block of 
``/21`` to ``/24``.

When you choose a smaller |cidr| block, the IP address space of the 
|cidr| block you choose is distributed evenly across the |gcp| regions 
to which you deploy the network peering container. |service| requires a 
|cidr| block of ``/24`` for each region. Refer to the following table to 
learn the number of regions to which you can deploy a network peering 
container based on the |cidr| block you choose.

.. list-table::
   :header-rows: 1
   :stub-columns: 1

   * - |cidr| Block
     - Number of |gcp| Regions
   * - ``/21``
     - 1 - 8
   * - ``/22``
     - 1 - 4
   * - ``/23``
     - 1 - 2
   * - ``/24``
     - 1

.. important::

   You can't use the |service| user interface to specify an |service| 
   |cidr| block smaller than ``/18``. You must use the |service| 
   :ref:`API <atlas-create-peering-container-api>` and
   specify the regions (up to eight, based on the |cidr| block you
   choose) to which to deploy the network peering container. You can 
   deploy |service| clusters only to these regions in this project.

|service| locks this value if an ``M10+`` cluster or a Network Peering
connection already exists. To modify the |cidr| block, ensure there are
no ``M10+`` clusters in the project *and* no other Network Peering
connections in the project. 

Alternatively, :ref:`create a new project <atlas-create-atlas-project>`
and create a Network Peering Connection to set the desired |service| 
Network Peering |cidr| block for that project.

.. important::

   |service| limits the number of MongoDB nodes per Network Peering
   connection based on the |cidr| block and the region selected for the project. 

   .. example::
   
               A project with an |service| |vpc| |cidr| block of
               ``/18`` is limited to approximately 80 three-node
               replica sets per |gcp| region.

   Contact :website:`MongoDB Support </contact>` for any questions on
   |service| limits of MongoDB nodes per Network Peering connection.
