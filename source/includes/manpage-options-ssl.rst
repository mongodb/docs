.. use |binary-name| to refer to ``mongos``/``mongod``.

.. option:: --ssl

   |binary-name| uses SSL for all connections.

.. after-ssl

.. include:: /includes/replace-pem-path-name.rst

.. option:: --sslCAFile <filename>

   .. versionadded:: 2.4

   .. versionadded:: 2.5.3
      SSL support added to Windows Enterprise.

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the :file:`.pem` file that contains the root certificate
   chain from the Certificate Authority. |pem-path-name|

.. option:: --sslPEMKeyFile <filename>

   .. versionadded:: 2.2

   .. versionadded:: 2.5.3
      SSL support added to Windows Enterprise.

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the :file:`.pem` file that contains both the SSL
   certificate and key. |pem-path-name|

   When SSL is enabled, you must specify :option:`--sslPEMKeyFile`.

.. option:: --sslPEMKeyPassword <value>

   .. versionadded:: 2.2

   .. versionadded:: 2.5.3
      SSL support added to Windows Enterprise.

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the password to de-crypt the certificate-key file
   (i.e. :option:`--sslPEMKeyFile`). Only use
   :option:`--sslPEMKeyPassword` if the certificate-key file is
   encrypted. In all cases, |binary-name| will redact the password from
   all logging and reporting output.

   .. versionchanged:: 2.6
      If the private key in the PEM file is encrypted and you do not
      specify :option:`--sslPEMKeyPassword`, |binary-name| will prompt
      for a passphrase. See :ref:`ssl-certificate-password`.

   .. versionchanged:: 2.4
      :option:`--sslPEMKeyPassword` is only needed when the private
      key is encrypted. In earlier versions |binary-name| would require
      :option:`--sslPEMKeyPassword` whenever using
      :option:`--sslOnNormalPorts`, even when the private key was not
      encrypted.

.. option:: --sslCRLFile <filename>

   .. versionadded:: 2.4

   .. versionadded:: 2.5.3
      SSL support added to Windows Enterprise.

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the :file:`.pem` file that contains the Certificate
   Revocation List. |pem-path-name|

.. option:: --sslFIPSMode

   .. versionadded:: 2.4

   .. versionadded:: 2.5.3
      SSL support added to Windows Enterprise.

   .. include:: /includes/note-general-ssl-support.rst

   When specified, |binary-name| will use the FIPS mode of the
   installed OpenSSL library. Your system must have a FIPS compliant
   OpenSSL library to use :option:`--sslFIPSMode`.
