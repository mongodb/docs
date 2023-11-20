.. setting:: spec.mongosPodSpec.podAntiAffinityTopologyKey

   *Type*: string

   *Default*: kubernetes.io/hostname

   
   Sets a |k8s-rule| to spread |k8s-mdbrsc| |k8s-pods|
   to different locations. A location can be a single node, rack, or
   region. This key defines which node
   `label <https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/>`__
   is used to `determine equal location <https://kubernetes.io/docs/concepts/configuration/assign-pod-node/>`__
   for nodes. By default, |k8s-op-short| tries to spread pods across
   different hosts.
   

