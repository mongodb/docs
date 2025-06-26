- To configure |ldap| in |k8s-crds|, use the parameters under the
  :setting:`spec.security.authentication.ldap` and other
  :ref:`security LDAP settings <security-settings>` specific to the
  {+mdbagent+}, from the |k8s-op-short| MongoDB resource specification.
  The procedures in this section describe the required settings and
  provide examples of |ldap| configuration.

- To improve security, consider deploying a
  :ref:`TLS-encrypted multi-cluster <multi-cluster-tls-overview>`.
  Encryption with |tls| is optional. By default, |ldap| traffic is sent
  as plain text. This means that username and password are exposed to
  network threats. Many modern directory services, such as Microsoft
  Active Directory, require encrypted connections. Consider using
  |ldap| over |tls-ssl| to encrypt authentication requests in your
  |k8s-op-short| MongoDB deployments.
