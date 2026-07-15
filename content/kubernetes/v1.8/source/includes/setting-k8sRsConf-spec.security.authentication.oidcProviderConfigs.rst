.. setting:: spec.security.authentication.oidcProviderConfigs

   *Type*: collection

   *Required*
   
   - MongoDB version has to be 7.0.11+ or 8.0.0+
   - MongoDB Enterprise only is supported
     
   .. note:: 
      At least one element in the collection is required when 
      ``spec.security.authentication.mode``  is set to ``OIDC``.
