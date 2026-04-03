.. setting:: spec.shardPodSpec.podTemplate.metadata

   *Type*: collection

   
   Metadata for the |k8s| Pods that the |k8s-op| creates for
   each :manual:`sharded cluster </reference/glossary/#std-term-sharded-cluster>` shard member.
   
   To review which fields you can add to ``spec.shardPodSpec.podTemplate.metadata``, see
   the :k8sdocs:`Kubernetes documentation </reference/generated/kubernetes-api/{+k8s-api-version+}/#objectmeta-v1-meta>`.

