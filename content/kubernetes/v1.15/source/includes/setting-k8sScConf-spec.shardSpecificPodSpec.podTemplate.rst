.. setting:: spec.shardSpecificPodSpec.podTemplate

   *Type*: collection

   
   :k8sdocs:`Template </concepts/workloads/pods/pod-overview/#pod-templates>`
   for the |k8s| Pods that the |k8s-op| creates for the specific shard.
   
   Template values take precedence over values specified in ``spec.shardSpecificPodSpec``.
   
   .. note::
   
      The |k8s-op-short| doesn't validate the fields you provide
      in ``spec.shardSpecificPodSpec.podTemplate``.

