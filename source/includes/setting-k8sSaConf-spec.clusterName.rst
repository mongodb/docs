.. setting:: spec.clusterName

   *Type*: string

   *Default*: cluster.local

   
   .. important:: ``spec.clusterName`` is Deprecated
   
      Use :setting:`spec.clusterDomain` instead.
   

   
   Domain name of the |k8s| cluster where you deploy the |k8s-op-short|.
   When |k8s| creates a |k8s-statefulset|, the |k8s| assigns each |k8s-pod|
   a |fqdn|. To update |com|, the |k8s-op-short| calculates the |fqdn| for
   each |k8s-pod| using a provided cluster name. |k8s| doesn't provide
   an |api| to query these hostnames.
   
   .. include:: /includes/admonitions/warning-set-cluster-name.rst
   

