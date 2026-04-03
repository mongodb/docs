.. setting:: spec.security.authentication.internalCluster

   *Type*: string

   Specifies whether :ref:`X.509 internal cluster authentication
   <x509-internal-authentication>` is enabled.
   
   To enable X.509 internal cluster authentication, set to ``"X509"``.
   Requires that the following settings be specified:
   
   - :setting:`spec.security.authentication.modes` ``: ["X509"]``
   - :setting:`spec.security.certsSecretPrefix`
   
   The |k8s-op-short| accepts the following values:
   
   - ``["X509"]``: X.509 internal cluster authentication is enabled.
   - ``""`` or omitted: internal cluster authentication is not enabled.
   
   .. important::
   
      After you enable internal cluster authentication, you can't disable
      it.
   

