.. setting:: spec.configSrvPodSpec.nodeAffinity

   *Type*: collection

   |k8s| |k8s-rule| to place |k8s-pods| for each :term:`config server` member on a
   specific range of |k8s-nodes|.
   
   .. example::
   
      A user can isolate "dev" and "testing" environments to ensure
      |k8s-pods| go to |k8s-nodes| with appropriate labels.

