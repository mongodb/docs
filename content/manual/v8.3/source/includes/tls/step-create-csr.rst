First, create a minimal OpenSSL configuration file called ``csr.conf`` that uses the
following format:

.. literalinclude:: /includes/tls/csr-config-template.rst

For more information about the fields in this file, see the OpenSSL 
`config file documentation <https://docs.openssl.org/3.6/man5/config/>`__.
Ensure that you fill out both the Common Name (``CN``) and Subject Alternative
Name (``alt_names``) fields in the configuration file.

Then, generate a :abbr:`CSR (Certificate Signing Request)`:

.. code-block:: bash

   openssl req -new -key mongo0.key -out mongo0.csr -config csr.conf

This creates ``mongo0.csr``. You will submit this file to
the CA.
