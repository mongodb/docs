By default, |mms| sets :msetting:`sslRequireValidServerCertificates` to
``true``. You need a valid trusted certificate to connect to MongoDB
instances using |tls|.

- If {+mdbagent+} manages {+magent+}, you can't set this option to
  ``false``.

- If you configure {+magent+} manually, you *can* set
  :msetting:`sslRequireValidServerCertificates` to ``false``.

- If you set :msetting:`sslRequireValidServerCertificates` to
  ``false``, don't set :msetting:`sslTrustedServerCertificates`. |mms|
  won't verify the certificates.

.. warning::

   Changing this setting to ``false`` disables certificate verification
   and makes connections between {+magent+} and MongoDB deployments
   susceptible to *man-in-the-middle* attacks. Change this setting to
   ``false`` only for testing purposes.
