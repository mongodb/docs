.. COMMENT because the common settings are not quite commong
   -- different versions added,
   -- invalid certificate check differ for mongod/mongos vs mongo,
   -- description differ for sslPEMKeyFile
   using separate rsts for mongod/s, mongo, tools

.. COMMENT this tools include file, unlike mongod/mongos/mongo
   uses the replacement holder of |tool-binary| to take
   advantage of the replace statement already in place in the
   individual program's file.

.. include:: /includes/replace-pem-path-name.rst

.. option:: --ssl

   .. versionadded:: 2.5.4

   .. include:: /includes/note-general-ssl-support.rst

   Enable connection to a :program:`mongod` or
   :program:`mongos` that has SSL support enabled.

.. option:: --sslPEMKeyFile <filename>

   .. versionadded:: 2.5.4

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the :file:`.pem` file that contains both the SSL
   certificate and key. |pem-path-name|

   Required when using the :option:`--ssl` option to connect to
   :program:`mongod` or :program:`mongos` that have
   :setting:`sslCAFile` enabled *without*
   :setting:`sslWeakCertificateValidation`.

.. option:: --sslPEMKeyPassword <value>

   .. versionadded:: 2.5.4

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the password to de-crypt the certificate-key file
   (i.e. :option:`--sslPEMKeyFile`). Only use
   :option:`--sslPEMKeyPassword` if the certificate-key file is
   encrypted. In all cases, |tool-binary| will redact the password from
   all logging and reporting output.

   If the private key in the PEM file is encrypted and you do not
   specify :option:`--sslPEMKeyPassword`, |tool-binary| will prompt for
   a passphrase. See :ref:`ssl-certificate-password`.

.. option:: --sslCAFile <filename>

   .. versionadded:: 2.5.4

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the :file:`.pem` file that contains the root certificate
   chain from the Certificate Authority. |pem-path-name|

.. option:: --sslCRLFile <filename>

   .. versionadded:: 2.5.4

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the :file:`.pem` file that contains the Certificate
   Revocation List. |pem-path-name|

.. option:: --sslFIPSMode

   .. versionadded:: 2.5.4

   .. include:: /includes/note-general-ssl-support.rst

   When specified, |binary-name| will use the FIPS mode of the
   installed OpenSSL library. Your system must have a FIPS compliant
   OpenSSL library to use :option:`--sslFIPSMode`.

.. option:: --sslAllowInvalidCertificates

   .. versionadded:: 2.5.4

   .. include:: /includes/note-general-ssl-support.rst

   Bypasses the validation checks for server certificates and allows
   the use of invalid certificates. When using the
   :setting:`sslAllowInvalidCertificates` setting, MongoDB logs as a
   warning the use of the invalid certificate.
