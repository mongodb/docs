.. setting:: spec.mongosPodSpec.podTemplate.affinity.nodeAffinity

   *Type*: collection

   |k8s| |k8s-rule| to place |k8s-pods| for :term:`replica set` on a
   specific range of |k8s-nodes|.

   For optimized read-write performance, use node affinity rules that 
   restrict |k8s-pods| to run on particular |k8s-nodes|, or to prefer 
   to run on particular |k8s-nodes|.
