- You must sign your sharded cluster's |tls| and X.509 certificates using
  the same |certauth|.

- Generate one |tls| certificate for each of the following components:

  - Each shard in your sharded cluster. Ensure that you add |san-dns|\s for 
    each |k8s| pod that hosts a shard member to the certificate. 

  - Your config servers. Ensure that you add |san-dns|\s for 
    each |k8s| pod that hosts your config servers to the certificate. 

  - Your |mongos| instances. Ensure that you add |san-dns|\s for 
    each |k8s| pod that hosts a |mongos| to the certificate. 
    
    In your |tls| certificates, the |san-dns| for each pod must use this 
    format:

    .. include:: /includes/prereqs/san-format.rst
  
  .. include:: /includes/prereqs/mdbagent-reqs.rst

- Generate one X.509 certificate for each of the following components:

  - Each shard in your sharded cluster. Ensure that you add |san-dns|\s for 
    each |k8s| pod that hosts a shard member to the certificate. 

  - Your config servers. Ensure that you add |san-dns|\s for 
    each |k8s| pod that hosts your config servers to the certificate. 

  - Your |mongos| instances. Ensure that you add |san-dns|\s for 
    each |k8s| pod that hosts a |mongos| to the certificate. 
    
  In your X.509 certificates, the |san-dns| for each pod must use this 
  format:

  .. include:: /includes/prereqs/san-format.rst

- You must possess the |certauth| certificate and the key that you used to 
  sign your |tls| certificates.

.. include:: /includes/prereqs/pem-format.rst
