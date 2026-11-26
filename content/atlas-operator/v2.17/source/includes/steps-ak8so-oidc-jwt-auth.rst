To set up {+oidc+} {+jwt+} and |k8s| authentication:

a. Run the following command to enable {+oidc+} {+jwt+} authentication
   for the mount path. If you set up several |k8s| clusters, you must enable {+oidc+} {+jwt+} authentication for each cluster's mount path.

   .. code-block::

      vault auth enable -path=jwt-kube01 jwt

#. Run the following command to allow unauthenticated access to the 
   {+oidc+} discovery URLs on the ``kube01.internal.io`` cluster:

   .. code-block::

      $ kubectl create clusterrolebinding oidc-reviewer  \
        --clusterrole=system:service-account-issuer-discovery \
        --group=system:unauthenticated 

#. Run the following command to direct {+vault+} to trust the cluster. The
   issuer for the cluster at ``https://kube01.internal.io/`` must
   match the URL in the {+oidc+} discovery document at 
   ``.well-known/openid-configuration``.

   .. code-block::

      curl https://kube01.internal.io/.well-known/openid-configuration | jq .issuer
      https://kube01.internal.io/
      vault write auth/jwt-kube01/config jwks_url="https://kube01.internal.io/openid/v1/jwks"

#. Create the policies that allow access to the secrets you want to
   expose to the cluster.

   The following example creates the ``external-secrets`` policy that
   you specify in later steps.

   .. code-block::

      echo external-secrets-policy.hcl
      path "secret/data/kube01/external-secrets/*" {
        capabilities = ["read"]
      }

#. Run the command to create a {+vault+} role and bind a |k8s|
   service account to the role, which restricts the access of the 
   service account within the {+vault+}.

   The following command creates the ``jwt-kube01-system`` role of the
   {+jwt+} ({+oidc+}) type for the ``vault`` audience. The command
   specifies the ``sub`` user claim, and the ``default`` |k8s| service 
   account in the ``mongodb-atlas-system`` namespace
   as the bound subject. This command ties the role to the
   ``external-secrets`` policy set of permissions within {+vault+}.

   .. code-block::

      vault write auth/jwt-kube01/role/jwt-kube01-system role_type="jwt" bound_audiences=vault \
        user_claim="sub" bound_subject="system:serviceaccount:mongodb-atlas-system:default" \
        policies="external-secrets"  

#. Run the command to create another role for External Secrets Operator
   to access the ``default`` namespace.

   The following command creates the ``jwt-kube01-default`` role of
   the {+jwt+} ({+oidc+}) type for the ``vault`` audience. This command
   specifies the ``sub`` user claim, and the ``default`` |k8s| service
   account in the ``default`` namespace as the bound subject . This
   command ties the role to the ``external-secrets`` policy set of
   permissions within {+vault+}.

   .. code-block::

      vault write auth/jwt-kube01/role/jwt-kube01-default role_type="jwt" bound_audiences=vault \
        user_claim="sub" bound_subject="system:serviceaccount:default:default" \
        policies="external-secrets"

#. Ensure {+oidc+} authentication runs successfully for
   the system service account:

   .. code-block::

      export TEST_JWT_TOKEN=$(kubectl -n mongodb-atlas-system create token default --audience "vault")
      vault write auth/jwt-kube01/login role=jwt-kube01-system jwt=$(TEST_JWT_TOKEN)
                  
   |ak8so| returns your {+oidc+} {+jwt+} credentials for the system
   service account.

#. Ensure {+oidc+} authentication runs successfully for
   the default service account:

   .. code-block::
      
      export TEST_JWT_TOKEN=$(kubectl -n default create token default --audience "vault")
      vault write auth/jwt-kube01/login role=jwt-kube01-default jwt=$(TEST_JWT_TOKEN)
                  
   |ak8so| returns your {+oidc+} {+jwt+} credentials for the default
   service account.