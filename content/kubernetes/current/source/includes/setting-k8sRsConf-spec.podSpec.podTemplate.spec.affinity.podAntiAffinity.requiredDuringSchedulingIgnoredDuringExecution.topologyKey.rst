.. setting:: spec.podSpec.podTemplate.spec.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey

   *Type*: string

   *Default*: kubernetes.io/hostname

   
   This key defines which
   `label <https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/>`__
   is used to determine which topology
   `domain <https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/>`__
   a node belongs to.
   