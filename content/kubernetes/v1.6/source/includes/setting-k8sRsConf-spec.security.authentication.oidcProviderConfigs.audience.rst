.. setting:: spec.security.authentication.oidcProviderConfigs.audience

   *Type*: string

   *Required*
   
   Entity that your external identity provider (IdP) intends the token for. Enter the 
   audience value from the app you registered with your external IdP. 
   When more than one IdP is defined, this must be a unique value for each
   configuration that shares an ``issuerURI``.
