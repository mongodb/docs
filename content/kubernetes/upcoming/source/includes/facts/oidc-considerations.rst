When you enable OIDC authentication, consider the following:

- **Identity Providers:** You must have a pre-existing, configured OIDC 
  Identity Provider (IdP). The Kubernetes Operator does not manage the 
  IdP itself.
- **Authorization:** The Kubernetes Operator configures authentication 
  (verifying identity) via OIDC. Authorization (granting permissions) 
  is handled by mapping OIDC claims to MongoDB roles within the MongoDB 
  custom resource.
- **Federation:** MongoDB supports both Workload Identity Federation 
  (for machine-to-machine authentication) and Workforce Identity Federation 
  (for human user authentication).
- **TLS Encryption:** To improve security, it is highly recommended to deploy a 
  TLS-encrypted replica set or a TLS-encrypted sharded cluster. While OIDC 
  communication with your identity provider is secured by HTTPS, enabling TLS 
  on your MongoDB resource encrypts the connection between your client 
  application and the database. This protects the OIDC token and all other 
  database traffic from network threats.