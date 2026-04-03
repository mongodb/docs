- You must sign your replica set's |tls| and X.509 certificates using
  the same |certauth|.

- Generate one |tls| certificate for each of the following components:

  - Your replica set. Ensure that you add |san-dns|\s for each |k8s| pod 
    that hosts a member of your replica set to the certificate.

    In your |tls| certificate, the |san-dns| for each pod must use the 
    following format:

    .. include:: /includes/prereqs/san-format.rst

  .. include:: /includes/prereqs/mdbagent-reqs.rst

- Generate one X.509 certificate for the replica set members to
  authenticate to each other. To learn about the requirements for X.509
  certificates for internal cluster authentication, see the
  :manual:`MongoDB Manual
  </core/security-internal-authentication/#x.509>`.

  Ensure that you add |san-dns|\s for each |k8s| pod 
  that hosts a member of your replica set to the certificate. The |san-dns|
  for each pod must use the following format:

  .. include:: /includes/prereqs/san-format.rst

- You must possess the |certauth| certificate and the key that you use to 
  sign your |tls| and X.509 certificates.

.. include:: /includes/prereqs/pem-format.rst