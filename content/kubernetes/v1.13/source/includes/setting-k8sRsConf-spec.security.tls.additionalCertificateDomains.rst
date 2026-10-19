.. setting:: spec.security.tls.additionalCertificateDomains

   *Type*: boolean

   
   List of every domain that should be added to |tls| certificates to
   each pod in this deployment. When you set this parameter, every |csr|
   that the |k8s-op-short| transforms into a |tls| certificate includes
   a |san-dns| in the form ``<pod name>.<additional cert domain>``.
   
   Replica set resources don't need this parameter. Use
   :setting:`spec.connectivity.replicaSetHorizons` instead.
   
   .. note::
   
      If you add this parameter to a |tls|\-enabled resource, |k8s|
      displays an error when the resource reaches the ``Pending`` state.
      This error displays: ``Please manually remove the |csr| in order
      to proceed.`` To remedy this issue:
   
      1. Remove any existing |csr|\s so that |k8s| can generate new
         |csr|\s. To learn how to delete a resource, see the
         :k8sdocs:`deleting resources
         </reference/kubectl/cheatsheet/#deleting-resources>` in the
         |k8s| documentation.
   
      2. Approve the |csr|\s after |k8s| generates them.
   

