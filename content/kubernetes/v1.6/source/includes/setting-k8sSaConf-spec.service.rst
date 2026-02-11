.. setting:: spec.service

   *Type*: string

   *Default*: <resource_name>+"-svc" and <resource_name>+"-svc-external"

   
   .. important:: ``spec.service`` is Deprecated
   
      Use :setting:`spec.statefulSet.spec.serviceName` instead.
   

   Name of the |k8s| service to be created or used for a
   |k8s-statefulset|. If the service with this name already exists, the
   |k8s-op-full| does not delete or recreate it. This setting lets
   you create your own custom services and lets the |k8s-op-short|
   reuse them.
   

