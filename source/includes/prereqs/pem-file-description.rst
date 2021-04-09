To create the |pem| file, concatenate the |tls| certificate and the
Private Key. An example of a |pem| file would resemble:

.. code-block:: text
   :copyable: false

   -----BEGIN CERTIFICATE-----
   ...
   ... your TLS certificate
   ...
   -----END CERTIFICATE-----
   -----BEGIN RSA PRIVATE KEY-----
   ...
   ... your private key
   ...
   -----END RSA PRIVATE KEY----
