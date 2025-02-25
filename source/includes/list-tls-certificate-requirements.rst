- A single Certificate Authority (CA) must issue all X.509 certificates 
  for the members of a sharded cluster or a replica set.

- At least one of the Subject Alternative Name (``SAN``) entries must
  match the server hostname used by other cluster members. When
  comparing ``SAN``\s, MongoDB can compare either DNS names or IP addresses.

  If you don't specify ``subjectAltName``, MongoDB compares the Common
  Name (CN) instead. However, this usage of CN is deprecated per `RFC2818 <https://datatracker.ietf.org/doc/html/rfc2818>`_

- If the certificate used as the ``certificateKeyFile`` includes 
  ``extendedKeyUsage``, the value must include both
  ``clientAuth`` ("TLS Web Client Authentication") and ``serverAuth``
  ("TLS Web Server Authentication").

  .. code-block:: none

     extendedKeyUsage = clientAuth, serverAuth

- If the certificate used as the ``clusterFile`` includes 
  ``extendedKeyUsage``, the value must include ``clientAuth``.

  .. code-block:: none

     extendedKeyUsage = clientAuth
