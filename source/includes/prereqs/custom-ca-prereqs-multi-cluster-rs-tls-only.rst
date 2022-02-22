- Generate one |tls| certificate for a ``MongoDBMulti`` resource.

  For each |k8s| service corresponding to each Pod in each member cluster,
  add |san-dns|\s to the certificate.

  In your |tls| certificate, the |san-dns| for each |k8s| service  must
  use the following format:

  .. include:: /includes/prereqs/san-format-multi-cluster.rst

  You must possess the |certauth| certificate and the key that you used
  to sign your |tls| certificates.

