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

   Multi-region clusters require one :abbr:`VPC (Virtual Private Cloud)`
   peering connection for each region. MongoDB nodes can use only the
   peering connection that resides in the same region as the nodes
   to communicate with the peered :abbr:`VPC (Virtual Private Cloud)`.
