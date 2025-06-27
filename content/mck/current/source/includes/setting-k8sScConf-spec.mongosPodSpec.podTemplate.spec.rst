.. setting:: spec.mongosPodSpec.podTemplate.spec

   *Type*: collection

   
   Specifications of the |k8s| Pods that the |k8s-op| creates for
   each |mongos| instance.
   
   To review which fields you can add to ``spec.mongosPodSpec.podTemplate.spec``, see the
   :k8sdocs:`Kubernetes PodSpec v1 core API </reference/generated/kubernetes-api/{+k8s-api-version+}/#podspec-v1-core>`.
   
   .. note::
   
      When you add containers to ``spec.mongosPodSpec.podTemplate.spec.containers``, the
      |k8s-op-short| adds them to the |k8s| pod. These containers are
      appended to each |mongos| instance containers in the pod.
   
   Use this setting to specify the CPU and RAM allocations for each pod. For
   examples, see :github:`the samples on GitHub </mongodb/mongodb-kubernetes/tree/master/public/samples/mongodb/podspec>`.

