.. setting:: spec.podSpec.nodeAffinity

   *Type*: Struct

   |k8s| |k8s-rule| to place |k8s-pods| for :term:`replica set` on a
   specific range of |k8s-nodes|.
   
   .. example::
   
      A user can isolate "dev" and "testing" environments to ensure
      |k8s-pods| go to |k8s-nodes| with appropriate labels.

