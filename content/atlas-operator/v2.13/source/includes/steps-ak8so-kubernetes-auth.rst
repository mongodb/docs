To set up |k8s| authentication:

a. Run the following command to enable |k8s| authentication
   for the mount path. If you set up several |k8s| clusters, you must
   enable |k8s| authentication for each cluster's mount path.

   .. code-block::

      vault auth enable -path=jwt-kube01 kubernetes

   When you install with Helm, it automatically configures cluster role
   binding.

#. Create policies that allow access to the secrets you want to
   expose to the cluster.

   The following example creates the policy ``vault-secret`` used
   in later steps. It uses ``vault``, a |k8s| |k8s-secret| bound
   to the {+vault+} service account that the Helm Chart CSI provider sets
   up.

   .. code-block::

      echo vault-secret.yaml
      apiVersion: v1
      kind: Secret
      metadata:
        name: vault
        annotations:
          kubernetes.io/service-account.name: vault
      type: kubernetes.io/service-account-token
      $ kubectl apply -f vault-secret.yaml

#. Run the commands to trust the |k8s| cluster and use |k8s| 
   authentication:

   .. code-block::

      export VAULT_JWT ?= $(shell kubectl get secret/vault -o jsonpath='{.data.token}' |base64 -d)

   .. code-block::

      vault write auth/k8s-kube01/config kubernetes_host="kube01.internal.io" token_reviewer_jwt=$(VAULT_JWT)

#. Run the command to create a {+vault+} role and bind a |k8s|
   service account to the role, which restricts the access of the 
   service account within the {+vault+}.

   The following command creates the ``k8s-kube01`` role at 
   ``auth/k8s-kube01`` bound to the |k8s| service account in the
   ``default`` or ``mongodb-atlas-system`` namespaces. This role ties
   to the ``secrets-store`` permissions policy within {+vault+}.

   .. code-block::

      vault write auth/k8s-kube01/role/k8s-kube01-role \
        bound_service_account_names=default,mongodb-atlas-operator \
        bound_service_account_namespaces=default,mongodb-atlas-system \
        policies=secrets-store

   The policies must exist and allow access to the secrets. The
   following example policy allows access to KV v2 secrets under the ``kube01/secrets-store`` path:

   .. code-block::

      path "secret/data/kube01/secrets-store/*" {
        capabilities = ["read"]
      }

#. Ensure |k8s| authentication runs successfully for
   the system service account:

   .. code-block::

      export TEST_JWT_TOKEN=$( kubectl create -n mongodb-atlas-system token mongodb-atlas-operator)
      vault write auth/jwt-kube01/login role=jwt-kube01-system jwt=$(TEST_JWT_TOKEN)
                  
#. Ensure |k8s| authentication runs successfully for
   the default account:

   .. code-block::

      export TEST_JWT_TOKEN=$(kubectl -n default create token default)
      vault write auth/jwt-kube01/login role=jwt-kube01-default jwt=$(TEST_JWT_TOKEN)