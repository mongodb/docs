.. setting:: mms.oidc.pkce.enabled

   *Type*: boolean

   *Default*: true

   Enables {+pkce+} for the authorization code flow. |mms| enables
   this setting by default. Disable this setting only if your |idp|
   doesn't support {+pkce+} for confidential clients.

   Corresponds to :setting:`Enable PKCE (Proof Key for Code Exchange)`.
