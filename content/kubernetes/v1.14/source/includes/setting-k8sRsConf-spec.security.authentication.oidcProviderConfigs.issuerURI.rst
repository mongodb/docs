.. setting:: spec.security.authentication.oidcProviderConfigs.issuerURI

   *Type*: string

   *Required*
   
   Issuer value provided by your registered IdP application. Using this URI, 
   MongoDB finds an OpenID Provider Configuration Document, which is 
   available in the ``/.wellknown/open-id-configuration`` endpoint. For MongoDB 
   ``8.0+``, the combination of ``issuerURI`` and audience must be unique 
   across OIDC provider configurations. For other MongoDB versions, the 
   ``issuerURI`` itself must be unique.
