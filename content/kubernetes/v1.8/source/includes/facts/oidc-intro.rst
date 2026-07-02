The |k8s-op-short| supports OpenID Connect (OIDC) as an authentication 
mechanism. When you configure OIDC authentication, client applications present 
a JSON Web Token (JWT) to the MongoDB resource. MongoDB validates the JWT 
against the configured OIDC Identity Provider (IdP) and uses claims within 
the token to determine the user's identity and, optionally, their group 
memberships for role-mapping.

This guide describes how to configure OIDC authentication for client 
applications that connect to your MongoDB deployments using the |k8s-op-short|.

.. note:: 

   You cannot secure a Standalone Instance of MongoDB with OIDC in a 
   Kubernetes cluster.
