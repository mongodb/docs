Generate a private key with OpenSSL:

.. code-block:: bash

    openssl genrsa -out mongo0.key 4096

This generates a 4096-bit RSA private key. If you need to use a different key
size or algorithm, see the OpenSSL documentation.

Restrict permissions on the generated ``mongo0.key`` file:

.. code-block:: bash

    chmod 600 mongo0.key

Keep this file secret. The server uses this key to prove it owns
the certificate.