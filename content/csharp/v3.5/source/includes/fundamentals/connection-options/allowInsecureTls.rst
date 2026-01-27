Specifies whether to relax TLS constraints as much as possible. This can include
allowing invalid certificates or hostname mismatches. The default value is ``false``.

If this property is set to ``true`` and ``SslSettings.CheckCertificateRevocation``
is set to ``false``, the {+driver-short+} will throw an exception.

The following code example shows how to set this option to ``true``: