.. setting:: spec.podSpec.podTemplate.spec

   *Type*: collection

   
   Specifications of the |k8s| Pods that the |k8s-op| creates for
   MongoDB database resources.
   
   To review which fields you can add to ``spec.podSpec.podTemplate.spec``, see the
   :k8sdocs:`Kubernetes PodSpec v1 core API </reference/generated/kubernetes-api/{+k8s-api-version+}/#podspec-v1-core>`.
   
   .. note::
   
      When you add containers to ``spec.podSpec.podTemplate.spec.containers``, the
      |k8s-op-short| adds them to the |k8s| pod. These containers are
      appended to MongoDB database resources containers in the pod.
   
   Use this setting to specify the CPU and RAM allocations for each pod. For
   examples, see :github:`the samples on GitHub </mongodb/mongodb-enterprise-kubernetes/tree/master/samples/mongodb/podspec>`.

