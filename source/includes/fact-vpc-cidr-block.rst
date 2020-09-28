|service| uses the specified |cidr| block for all other Network Peering
connections created in the project. The |service| |cidr| block must be
at least a ``/24`` and at most a ``/21`` in one of the following :rfc:`private networks <1918#section-3>`.

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

|service| locks this value if an ``M10+`` cluster or a Network Peering
connection already exists. To modify the |cidr| block, ensure there are
no ``M10+`` clusters in the project *and* no other |vpc| peering
connections in the project. 

Alternatively, :ref:`create a new project <mcli-iam-project-create>`
and create a Network Peering Connection to set the desired |service| 
|vpc| |cidr| block for that project.

.. important::

   |service| limits the number of MongoDB nodes per Network Peering
   connection based on the |cidr| block and the region selected for the project. 

   .. example::

      A project in an |aws| region supporting 3 availability
      zones and a |service| |cidr| |vpc| block of ``/24`` is
      limited to the equivalent of 27 three-node replica sets.

   Contact :website:`MongoDB Support </contact>` for any questions on
   |service| limits of MongoDB nodes per |vpc|.
