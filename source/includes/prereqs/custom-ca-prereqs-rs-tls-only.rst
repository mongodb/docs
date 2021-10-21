- Generate one |tls| certificate for each of the following components:

  - Your replica set. Ensure that you add |san-dns|\s for each |k8s| pod 
    that hosts a member of your replica set to the certificate. 

    In your |tls| certificate, the |san-dns| for each pod must use the 
    following format:

    .. include:: /includes/prereqs/san-format.rst

  .. include:: /includes/prereqs/mdbagent-reqs.rst

- You must possess the |certauth| certificate and the key that you used to 
  sign your |tls| certificates.

.. include:: /includes/prereqs/pem-format.rst
