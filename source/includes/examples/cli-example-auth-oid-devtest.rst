.. code-block:: shell

   atlas federatedAuthentication federationSettings identityProvider create oidc Azure \
     --audience "https://management.azure.com/" \
     --authorizationType "USER" \
     --desc "oidc-for-azure" \
     --federationSettingsId "5d1113b25a115342acc2d1aa" \
     --groupsClaim "groups" \
     --idpType "WORKFORCE" \
     --issuerUri "https://sts.windows.net/" \
     --userClaim "sub"  