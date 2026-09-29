.. setting:: mms.oidcMethod

   *Type*: string

   The token acquisition method that |onprem| uses to authenticate to
   the |application| Database with |oidc|. Set this option to one of
   the following values:

   - ``callback``: Use the client credentials flow against a custom
     |idp|, such as Keycloak, Okta, or Azure.
   - ``azure``: Use built-in environment authentication for a
     workload identity on Azure.
   - ``gcp``: Use built-in environment authentication for a workload
     identity on GCP.
   - ``k8s``: Use built-in environment authentication for a
     Kubernetes workload identity.

   For the ``azure``, ``gcp``, and ``k8s`` methods, the MongoDB
   driver obtains a workload identity token from the environment and
   does not require a client secret.

   .. code-block:: ini

      mongo.oidcMethod=callback


