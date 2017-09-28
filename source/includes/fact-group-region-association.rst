During deployment of an ``M10+`` dedicated paid cluster, |service| creates a
:abbr:`VPC (Virtual Private Cloud)` for the selected provider and region or
regions if no existing :abbr:`VPC (Virtual Private Cloud)` or :abbr:`VPC
(Virtual Private Cloud)` peering connection exists for that provider and
region. |service| assigns the :abbr:`VPC (Virtual Private Cloud)` a Classless
Inter-Domain Routing (CIDR) block. 

For clusters deployed on :abbr:`AWS (Amazon Web Services)`, if you want to
create a :abbr:`VPC (Virtual Private Cloud)` peering connection to an
:abbr:`AWS (Amazon Web Services)` VPC *and* require a specific :abbr:`CIDR
(Classless Inter-Domain Routing)` block for a given region, you must create a
:abbr:`VPC (Virtual Private Cloud)` connection *before* deploying the cluster.
See :doc:`/security-vpc-peering` for for complete documentation on
:abbr:`VPC (Virtual Private Cloud)` peering connections.

.. important::

   :abbr:`AWS (Amazon Web Services)` does *not* support cross-region
   :abbr:`VPC (Virtual Private Cloud)` peering. Multi-region clusters require
   one :abbr:`VPC (Virtual Private Cloud)` peering connection per region. Only
   those MongoDB nodes in that region can use the peering connection to
   communicate with the peered :abbr:`VPC (Virtual Private Cloud)`.
