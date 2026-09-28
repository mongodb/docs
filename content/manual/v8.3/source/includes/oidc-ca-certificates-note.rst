For environments using X509 TLS certificates signed by an internal
Certificate Authority (CA), you must add the CA certificate to the
system CA certificate bundle so that :binary:`~bin.mongod` can
communicate with the identity provider. This applies to user
authentication and to workload authentication when using the callback
method. Omitting this step might result in OIDC SSL Certificate or JWT
Key Verification errors.