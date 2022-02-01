|service| uses this |service| |cidr| block for all other Network Peering
connections created in the project. The |service| |cidr| block must be
at least a ``/24`` and at most a ``/21`` in one of the following :rfc:`private networks <rfc1918#section-3>`.

.. include:: /includes/list-tables/aws-vpc-ranges.rst

|service| locks this value if an ``M10`` or greater cluster or a
Network Peering connection exists.

To modify the |cidr| block, the target project cannot have:

- Any ``M10`` or greater clusters
- Any other |vpc| peering connections

You can also :ref:`create a new project <atlas-create-atlas-project>`
then create a Network Peering Connection to set the desired |service| 
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
