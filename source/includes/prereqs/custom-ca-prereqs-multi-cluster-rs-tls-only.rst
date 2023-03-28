- To enable internal cluster authentication, create certificates for
  member clusters in the |multi-cluster|.
- Generate one |tls| certificate covering the |san-dns|\s of all the member
  clusters in the |mongodb-multi|.
- For each |k8s| service that the |k8s-op-short| generates corresponding
  to each Pod in each member cluster, add |san-dns|\s to the certificate.
  In your |tls| certificate, the |san-dns| for each |k8s| service must
  use the following format:

  .. include:: /includes/prereqs/san-format-multi-cluster.rst

- Generate one TLS certificate for your project's MongoDB Agents.

  .. include:: /includes/prereqs/mdbagent-reqs-multi-cluster.rst

- You must possess the |certauth| certificate and the key that you used to
  sign your |tls| certificates.

.. include:: /includes/prereqs/pem-format.rst
