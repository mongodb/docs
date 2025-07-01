.. option:: --sslAllowInvalidCertificates


   *Deprecated. Use* ``tlsInsecure`` *instead.*

   Bypasses the validation checks for certificates presented by the source
   replica set. When using the ``--allowInvalidCertificates`` setting, MongoDB
   logs as a warning the use of the invalid certificate.

   .. important::
      This option skips all certificate validation, which may result in
      accepting invalid certificates.
   

