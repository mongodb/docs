.. setting:: spec.shardPodSpec.podTemplate

   *Type*: collection

   
   :k8sdocs:`Template </concepts/workloads/pods/pod-overview/#pod-templates>`
   for the |k8s| Pods that the |k8s-op| creates for each :manual:`sharded cluster </reference/glossary/#std-term-sharded-cluster>` shard member.
   
   Template values take precedence over values specified in ``spec.shardPodSpec``.
   
   .. note::
   
      The |k8s-op-short| doesn't validate the fields you provide
      in ``spec.shardPodSpec.podTemplate``.

