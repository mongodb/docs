.. use |binary-name| to refer to ``mongos``/``mongod``.

.. include:: /includes/replace-pem-path-name.rst

.. option:: --sslOnNormalPorts

   .. versionadded:: 2.2

   .. include:: /includes/note-general-ssl-support.rst

   Enables SSL for |binary-name|. With :option:`--sslOnNormalPorts`,
   a |binary-name| requires SSL encryption for all connections on the
   default MongoDB port, or the port specified by :option:`--port`. By
   default, :option:`--sslOnNormalPorts` is disabled.

.. option:: --sslPEMKeyFile <filename>

   .. versionadded:: 2.2

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the :file:`.pem` file that contains both the SSL
   certificate and key. |pem-path-name|

   When using :option:`--sslOnNormalPorts`, you must specify
   :option:`--sslPEMKeyFile`.

.. option:: --sslPEMKeyPassword <value>

   .. versionadded:: 2.2

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the password to de-crypt the certificate-key file
   (i.e. :option:`--sslPEMKeyFile`). Only use
   :option:`--sslPEMKeyPassword` if the certificate-key file is
   encrypted. In all cases, |binary-name| will redact the password from
   all logging and reporting output.

   .. versionchanged:: 2.4
      :option:`--sslPEMKeyPassword` is only needed when th private
      key is encrypted. In earlier versions |binary-name| would require
      :option:`--sslPEMKeyPassword` whenever using
      :option:`--sslOnNormalPorts`, even when the private key was not
      encrypted.

.. option:: --sslCAFile <filename>

   .. versionadded:: 2.4

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the :file:`.pem` file that contains the root certificate
   chain from the Certificate Authority. |pem-path-name|

.. option:: --sslCRLFile <filename>

   .. versionadded:: 2.4

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the :file:`.pem` file that contains the Certificate
   Revocation List. |pem-path-name|

.. option:: --sslWeakCertificateValidation

   .. versionadded:: 2.4

   .. include:: /includes/note-general-ssl-support.rst

   Disables the requirement for SSL certificate validation, that
   :option:`--sslCAFile` enables. With
   :option:`--sslWeakCertificateValidation`, |binary-name| will accept
   connections if the client does not present a certificate when
   establishing the connection.

   If the client presents a certificate and |binary-name| has
   :option:`--sslWeakCertificateValidation` enabled, |binary-name|
   will validate the certificate using the root certificate chain
   specified by :option:`--sslCAFile`, and reject clients with invalid
   certificates.

   Use :option:`--sslWeakCertificateValidation` if you have a mixed
   deployment that includes clients that do not or cannot present
   certificates to |binary-name|.

.. option:: --sslFIPSMode

   .. versionadded:: 2.4

   .. include:: /includes/note-general-ssl-support.rst

   When specified, |binary-name| will use the FIPS mode of the
   installed OpenSSL library. Your system must have a FIPS compliant
   OpenSSL library to use :option:`--sslFIPSMode`.
