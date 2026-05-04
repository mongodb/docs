.. note::

   Your :parameter:`oidcIdentityProviders` configuration determines the 
   approach you must take to authorize users:

   - If the ``useAuthorizationClaim`` field is set to ``false`` to enable 
     internal authorization, authorize users with user IDs.

   - If the field is set to ``true``, authorize users with identity provider 
     groups.
