Starting in MongoDB 7.0, when multiple identity providers (IDP) are 
defined, the :parameter:`oidcIdentityProviders` parameter accepts duplicate 
``issuer`` values as long as the ``audience`` value is unique for each 
issuer. 
