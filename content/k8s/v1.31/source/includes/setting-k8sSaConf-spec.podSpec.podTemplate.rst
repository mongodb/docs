.. setting:: spec.podSpec.podTemplate

   *Type*: collection

   
   :k8sdocs:`Template </concepts/workloads/pods/pod-overview/#pod-templates>`
   for the |k8s| Pods that the |k8s-op| creates for MongoDB database resources.
   
   Template values take precedence over values specified in ``spec.podSpec``.
   
   .. note::
   
      The |k8s-op-short| doesn't validate the fields you provide
      in ``spec.podSpec.podTemplate``.

