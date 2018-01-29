|service| uses the specified :abbr:`CIDR (Classless Inter-Domain Routing)`
block for all other VPC peering connections created in the project.

The |service| :abbr:`CIDR (Classless Inter-Domain Routing)` block must
be at least a ``/24`` and at most a ``/21`` in one of the following
`private networks <https://tools.ietf.org/html/rfc1918#section-3>`_.

- ``10.0.0.0`` - ``10.255.255.255``  (10/8 prefix)

- ``172.16.0.0`` - ``172.31.255.255``  (172.16/12 prefix)

- ``192.168.0.0`` - ``192.168.255.255`` (192.168/16 prefix)

|service| locks this value if an ``M10+`` cluster or a VPC peering connection
already exists. To modify the :abbr:`CIDR (Classless Inter-Domain Routing)`
block, ensure there are no ``M10+`` clusters in the project *and* no other VPC
peering connections in the project. Alternatively, :ref:`create a new project
<atlas-create-atlas-project>` and create a VPC Peering Connection to set the
desired |service| VPC :abbr:`CIDR (Classless Inter-Domain Routing)` block for
that project.

.. important::

   |service| limits the number of MongoDB nodes per VPC based on the
   :abbr:`CIDR (Classless Inter-Domain Routing)` block and the region selected
   for the project. For example, a project in an AWS region supporting 3
   availability zones and a |service| 
   :abbr:`CIDR (Classless Inter-Domain Routing)` VPC block of ``/24`` is 
   limited to the equivalent of 27 3-node replica sets.
   
   Contact `MongoDB Support 
   <https://www.mongodb.com/contact?jmp=atlas%20docs>`_ 
   for any questions on |service| limits of MongoDB nodes per VPC.
