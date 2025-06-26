.. setting:: spec.podSpec.podTemplate.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey

   *Type*: Struct

   *Default*: kubernetes.io/hostname

   
   This key defines which
   :k8sdocs:`label <concepts/overview/working-with-objects/labels/>`
   is used to determine which topology
   :k8sdocs:`domain <concepts/scheduling-eviction/topology-spread-constraints/>`
   a node belongs to.
   