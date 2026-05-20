.. code-block:: 
   :copyable: true 

   atlas federatedAuthentication federationSettings identityProvider create oidc IDPName \ 
     --audience "api://12345678-1234-1234-1234-123456789abc" \ 
     --authorizationType "GROUP" \
     --clientId "abcdef12-3456-7890-abcd-ef1234567890" \
     --desc "MyOIDCProvider test" \
     --federationSettingsId "5d1113b25a115342acc2d1aa" \
     --groupsClaim "groups" \
     --idpType "WORKLOAD" \
     --issuerUri "https://sts.windows.net/12345678-1234-1234-1234-123456789abc/" \
     --userClaim "sub"  \
     --associatedDomain "example.com"

             