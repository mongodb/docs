.. setting:: spec.exposedExternally

   *Type*: boolean

   *Default*: false

   
   .. important::
   
      ``spec.exposedExternally`` is deprecated starting in |k8s-op-short| version 1.19 
      and will be removed in a future |k8s-op-short| release. To configure how your deployment 
      should be exposed externally, use the :setting:`spec.externalAccess` settings.
   
   Determines whether a |multi-cluster| is exposed outside the |k8s| clusters. 
   Setting ``spec.exposedExternally: true`` is equivalent to setting ``spec.externalAccess: {}``. 
   See :setting:`spec.externalAccess` for details.
   

