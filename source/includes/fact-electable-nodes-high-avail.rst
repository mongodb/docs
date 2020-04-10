Having additional regions with electable nodes
increases availability and helps better withstand data center
outages.

The first row in the :guilabel:`Electable nodes` section lists the
:guilabel:`Highest Priority` region. |service| prioritizes nodes in
this region for primary eligibility. For the nodes in subsequent 
regions, priority is configured in the order that they appear. For 
more information on priority in replica set :term:`elections <election>`, 
see :manual:`Member Priority </core/replica-set-elections/index.html#member-priority>`.
