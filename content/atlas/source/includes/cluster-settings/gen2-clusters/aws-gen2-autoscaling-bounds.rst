.. important:: Auto-scaling bounds when switching a cluster's generation
   
   A cluster's auto-scaling bounds must belong to the same generation as the
   cluster.
   
   ``M10`` and ``M20`` clusters are generation-agnostic. You can set their
   auto-scaling bounds to be any generation and you can use ``M10`` and ``M20``
   clusters as auto-scaling bounds for any cluster generation.

   The {+atlas-admin-api+} returns an ``INVALID_ATTRIBUTE`` error if
   you attempt to do either of the following:
   
   - Change a cluster's generation to one that is different from the generation
     of the cluster's auto-scaling bounds.
   - Set a cluster's auto-scaling bounds to be an ``M30+`` tier cluster
     belonging to a different generation than the cluster.