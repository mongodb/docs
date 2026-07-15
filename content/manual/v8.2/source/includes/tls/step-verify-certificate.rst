After you receive or create your certificate, verify that it
matches the private key:

.. code-block:: bash

   # Compare the modulus of the key and certificate
   openssl rsa -noout -modulus -in  mongo0.key | openssl sha256
   openssl x509 -noout -modulus -in mongo0.crt | openssl sha256

The output digests must match. If they do not, the certificate and
key do not belong together, and MongoDB will not be able to use
them.