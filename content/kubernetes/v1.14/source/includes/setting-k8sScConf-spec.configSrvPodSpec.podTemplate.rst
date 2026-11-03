.. setting:: spec.configSrvPodSpec.podTemplate

   *Type*: collection

   
   :k8sdocs:`Template </concepts/workloads/pods/pod-overview/#pod-templates>`
   for the |k8s| Pods that the |k8s-op| creates for each :term:`config server` member.
   
   Template values take precedence over values specified in ``spec.configSrvPodSpec``.
   
   .. note::
   
      The |k8s-op-short| doesn't validate the fields you provide
      in ``spec.configSrvPodSpec.podTemplate``.

