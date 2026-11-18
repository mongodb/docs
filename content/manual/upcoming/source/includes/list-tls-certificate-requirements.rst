- Each member of a sharded cluster or a replica set must trust the
  Certificate Authority (CA) that issued the X.509 certificates for
  its peers.

- At least one of the Subject Alternative Name (``SAN``) entries must
  match the server hostname used by other cluster members. When
  comparing ``SAN``\s, MongoDB can compare either DNS names or IP addresses.

  If you don't specify ``subjectAltName``, MongoDB compares the Common
  Name (CN) instead. However, this usage of CN is deprecated per
  `RFC2818 <https://datatracker.ietf.org/doc/html/rfc2818>`_

.. note::

   Members can trust more than one CA. Each member trusts the CAs in
   its trusted CA file, which you set with
   :setting:`net.tls.CAFile`.

   When you rotate certificates to a new CA, first add the new CA to
   the trusted CA file on every member. Then rotate the member
   certificates. Peers reject a certificate if they don't yet trust
   its CA.

Key Usage and Extended Key Usage are X.509 extensions that strictly
define and restrict the use of the key associated with a
certificate. Both of these extensions are optional. If
``tlsCertificateKeyFile`` or ``tlsClusterFile`` point to certificates
that omit these extensions, no restrictions apply to using the
certificate.

If X.509 certificates used for ``tlsCertificateKeyFile`` or
``tlsClusterFile`` include the Extended Key Usage (EKU) extension, they
must comply with the following rules:

- ``tlsCertificateKeyFile`` must include ``serverAuth`` in EKU.

  .. code-block:: none

     extendedKeyUsage = serverAuth

- ``tlsClusterFile`` must include ``clientAuth`` in EKU:

  .. code-block:: none

     extendedKeyUsage = clientAuth

- If ``tlsClusterFile`` is omitted and only ``tlsCertificateKeyFile``
  is configured, then ``tlsCertificateKeyFile`` must include both
  ``serverAuth`` and ``clientAuth`` in EKU:

  .. code-block:: none

     extendedKeyUsage = clientAuth, serverAuth

If X.509 certificates used for ``tlsCertificateKeyFile`` or
``tlsClusterFile`` include the Key Usage (KU) extension, set it
as follows:

- ``tlsCertificateKeyFile`` should contain ``digitalSignature``,
  ``keyEncipherment``, and ``keyAgreement`` in its KU extension:

  .. code-block:: none

     keyUsage = digitalSignature, keyEncipherment, keyAgreement

- ``tlsClusterFile`` should contain ``digitalSignature`` in its
  KU extension:

  .. code-block:: none

     keyUsage = digitalSignature