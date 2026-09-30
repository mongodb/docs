.. setting:: spec.shardPodSpec.storage

   *Type*: string

   *Default*: 16Gi

   Minimum storage capacity that must be available on a |k8s|
   |k8s-node| to host each :term:`sharded cluster` shard member. This value is
   expressed as an integer followed by a unit of storage in |jedec|
   notation.
   
   .. example::
   
      If this |k8s-mdbrsc| requires 60 gigabytes of storage space, set
      this value to ``60Gi``.

