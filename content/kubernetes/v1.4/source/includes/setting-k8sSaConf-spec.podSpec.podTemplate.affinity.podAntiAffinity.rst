.. setting:: spec.podSpec.podTemplate.affinity.podAntiAffinity

   *Type*: Struct

   *Default*: kubernetes.io/hostname

   
   Sets a |k8s-rule| to spread |k8s-pods| hosting |k8s-mdbrsc|
   to different locations. A location can be a single node, rack, or
   region. By default, |k8s-op-short| tries to spread pods across
   different nodes.
