.. option:: --ssl

   .. versionadded:: 2.2

   Enable connection to a :program:`mongod` or
   :program:`mongos` that has SSL support enabled.

   .. include:: /includes/fact-ssl-supported.rst

.. option:: --sslPEMKeyFile <filename>

   .. versionadded:: 2.4

   Specifies the :file:`.pem` file that contains both the SSL
   certificate and key. Specify the file name of the :file:`.pem` file
   using relative or absolute paths.

   Required when using the :option:`--ssl` option to connect to
   :program:`mongod` or :program:`mongos` that have
   :setting:`sslCAFile` enabled *without*
   :setting:`sslWeakCertificateValidation`.

   .. include:: /includes/fact-ssl-supported.rst

.. option:: --sslPEMKeyPassword <value>

   .. versionadded:: 2.4

   Specifies the password to de-crypt the certificate-key file
   (i.e. :option:`--sslPEMKeyFile`). Only use
   :option:`--sslPEMKeyPassword` if the certificate-key file is
   encrypted. In all cases, |binary-name| will redact the password from
   all logging and reporting output.

   .. versionchanged:: 2.6
      If the private key in the PEM file is encrypted and you do not
      specify :option:`--sslPEMKeyPassword`, |binary-name| will prompt
      for a passphrase. See :ref:`ssl-certificate-password`.

   .. include:: /includes/fact-ssl-supported.rst

.. option:: --sslCAFile <filename>

   .. versionadded:: 2.4

   Specifies the :file:`.pem` file that contains the root certificate
   chain from the Certificate Authority. Specify the file name of the
   :file:`.pem` file using relative or absolute paths.

   .. include:: /includes/fact-ssl-supported.rst

.. option:: --sslCRLFile <filename>

   .. versionadded:: 2.4

   Specifies the :file:`.pem` file that contains the Certificate
   Revocation List. Specify the file name of the :file:`.pem` file
   using relative or absolute paths.

   .. include:: /includes/fact-ssl-supported.rst

.. option:: --sslFIPSMode

   .. versionadded:: 2.4

   When specified, |binary-name| will use the FIPS mode of the
   installed OpenSSL library. Your system must have a FIPS compliant
   OpenSSL library to use :option:`--sslFIPSMode`.

   .. include:: /includes/fact-ssl-supported.rst

.. option:: --sslAllowInvalidCertificates

   .. versionadded:: 2.5.4

   Bypasses the validation checks for server certificates and allows
   the use of invalid certificates. When using the
   :setting:`sslAllowInvalidCertificates` setting, MongoDB logs as a
   warning the use of the invalid certificate.

   .. include:: /includes/fact-ssl-supported.rst
