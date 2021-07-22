.. option:: --sslAllowInvalidHostnames


   *Deprecated. Use* ``tlsInsecure`` *instead.*

   Disables the validation of the TLS/SSL certificates presented by
   the source replica set. Allows |mongomirror| to connect to the
   source replica set if the hostname in the certificates does not match the
   specified hostname.


   .. important::
      This option skips all certificate validation, which may result in
      accepting invalid certificates.

