.. setting:: spec.security.authentication.oidcProviderConfigs.authorizationMethod

   *Type*: string

   *Required*
   
   Valid values are ``WorkforceIdentityFederation`` and ``WorkloadIdentityFederation``. 
   Configure single-sign-on for human user access to deployments with Workforce 
   Identity Federation. For programmatic application access to deployments, use 
   Workload Identity Federation. Only one Workforce Identity Federation IdP can be 
   configured per MongoDB resource. To learn more, see `Authentication and Authorization with OIDC/OAuth 2.0 <https://www.mongodb.com/docs/manual/core/oidc/security-oidc/>`__.
