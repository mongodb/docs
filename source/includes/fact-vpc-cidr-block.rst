|service| uses this |service| |cidr| block for all other network peering
connections created in the project. The |service| |cidr| block must be
at least a ``/24`` and at most a ``/21`` in one of the following :rfc:`private networks <rfc1918#section-3>`.

.. include:: /includes/list-tables/aws-vpc-ranges.rst

|service| locks this value for a given region if an ``M10`` or greater
cluster or a network peering connection already exists in that region.  

To modify the |cidr| block, the target project cannot have:

- Any ``M10`` or greater clusters with nodes in the target region
- Any cloud backup snapshots stored in the target region
- Any other |vpc| peering connections to the target region

You can also :ref:`create a new project <atlas-create-atlas-project>`
then create a network peering connection to set the desired |service| 
|vpc| |cidr| block for that project.

:gold:`IMPORTANT:` |service| limits the number of MongoDB nodes per network peering
connection based on the |cidr| block and the region selected for the project: 

- For example, a project in an |aws| region supporting 3 availability
  zones and a |service| |cidr| |vpc| block of ``/24`` is
  limited to the equivalent of 27 three-node replica sets.
- Contact :website:`MongoDB Support </contact>` for any questions on
  |service| limits of MongoDB nodes per |vpc|.
