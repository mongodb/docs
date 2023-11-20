.. setting:: spec.shardPodSpec.nodeAffinity

   *Type*: string

   |k8s| |k8s-rule| to place |k8s-pods| for each :term:`sharded cluster` shard member on a
   specific range of |k8s-nodes|.
   
   .. example::
   
      A user can isolate "dev" and "testing" environments to ensure
      |k8s-pods| go to |k8s-nodes| with appropriate labels.

