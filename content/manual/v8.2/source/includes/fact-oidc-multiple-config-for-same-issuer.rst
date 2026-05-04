Starting in MongoDB 8.0, when multiple identity providers (IDP) are 
defined, the :parameter:`oidcIdentityProviders` parameter accepts duplicate 
``issuer`` values as long as the ``audience`` value is unique for each 
issuer. This is also available in versions 7.3 and 7.0. 
