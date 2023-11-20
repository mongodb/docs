.. setting:: spec.version

   *Type*: string

   Version of MongoDB that you installed on this |k8s-mdbrsc|.
   
   .. include:: /includes/admonitions/ubi-8-min-db-versions.rst
   
   .. note::
   
      If you update this value to a later version of MongoDB for your 
      database resources, the Feature Compatibility Version (FCV) changes 
      automatically to this version unless you set :setting:`spec.featureCompatibilityVersion` 
      to the original version. Consider setting :setting:`spec.featureCompatibilityVersion` 
      to the original version to give yourself the option to downgrade if necessary.
   

