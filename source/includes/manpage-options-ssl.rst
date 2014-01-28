.. use |binary-name| to refer to ``mongos``/``mongod``.

.. option:: --sslOnNormalPorts

   .. deprecated:: 2.5.3

   .. versionadded:: 2.2

   .. include:: /includes/note-general-ssl-support.rst

   Enables SSL for |binary-name|. With :option:`--sslOnNormalPorts`,
   a |binary-name| requires SSL encryption for all connections on the
   default MongoDB port, or the port specified by :option:`--port`. By
   default, :option:`--sslOnNormalPorts` is disabled.

.. option:: --sslMode <mode>

   .. versionadded:: 2.5.3

   .. include:: /includes/note-general-ssl-support.rst

   Use the ``--sslMode`` option to enable SSL or use mixed SSL modes on
   a port. The :option:`--sslMode` option can have one of the following
   values:

   .. list-table::
      :header-rows: 1
      :widths: 20 40

      * - Value

        - Description

      * - ``disabled``

        - The server does not use SSL.

      * - ``allowSSL``

        - Connections between servers do not use SSL. For incoming
          connections, the server accepts both SSL and non-SSL.

      * - ``preferSSL``

        - Connections between servers use SSL. For incoming
          connections, the server accepts both SSL and non-SSL.

      * - ``requireSSL``

        - The server uses and accepts only SSL encrypted connections.

.. option:: --sslPEMKeyFile <filename>

   .. versionadded:: 2.2

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the :file:`.pem` file that contains both the SSL
   certificate and key. Specify the file name of the :file:`.pem`
   file using relative or absolute paths.

   When SSL is enabled, you must specify :option:`--sslPEMKeyFile`.

.. option:: --sslPEMKeyPassword <value>

   .. versionadded:: 2.2

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

.. option:: --sslCAFile <filename>

   .. versionadded:: 2.4

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the :file:`.pem` file that contains the root certificate
   chain from the Certificate Authority. Specify the file name of the
   :file:`.pem` file using relative or absolute paths.

.. option:: --sslCRLFile <filename>

   .. versionadded:: 2.4

   .. include:: /includes/note-general-ssl-support.rst

   Specifies the :file:`.pem` file that contains the Certificate
   Revocation List. Specify the file name of the :file:`.pem`
   file using relative or absolute paths.

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

.. option:: --clusterAuthMode <option>

  .. versionadded:: 2.6

  .. include:: /includes/note-general-ssl-support.rst

  Use the ``--clusterAuthMode`` option to :ref:`enable internal x.509
  authentication for membership <x509-internal-authentication>` to the
  cluster or the replica set. The :option:`--clusterAuthMode` option
  can have one of the following values:

  .. list-table::
     :header-rows: 1
     :widths: 20 40

     * - Value

       - Description

     * - ``keyFile``

       - Default value. Use keyfile for authentication.

     * - ``sendKeyFile``

       - For rolling upgrade purposes. Send the keyfile for
         authentication but can accept either keyfile or x.509
         certificate.

     * - ``sendX509``

       - For rolling upgrade purposes. Send the x.509 certificate for
         authentication but can accept either keyfile or x.509
         certificate.

     * - ``x509``

       - Recommended. Send the x.509 certificate for authentication and
         accept **only** x.509 certificate.

.. option:: --sslClusterFile <filename>

  .. versionadded:: 2.6

  .. include:: /includes/note-general-ssl-support.rst

  Specifies the :file:`.pem` file that contains the x.509
  certificate-key file for :ref:`membership authentication
  <x509-internal-authentication>` for the cluster or replica set.

.. option:: --sslClusterPassword <value>

  .. versionadded:: 2.6

  .. include:: /includes/note-general-ssl-support.rst

  Specifies the password to de-crypt the x.509 certificate-key file
  specified with :option:`--sslClusterFile`. Only use
  :option:`--sslClusterPassword` if the certificate-key file is
  encrypted. In all cases, |binary-name| will redact the password from
  all logging and reporting output.

  .. versionchanged:: 2.6
     If the x.509 key file is encrypted and you do not specify
     :option:`--sslClusterPassword`, |binary-name| will prompt for
     a passphrase. See :ref:`ssl-certificate-password`.

.. option:: --sslAllowInvalidCertificates

   .. versionadded:: 2.5.4

   .. include:: /includes/note-general-ssl-support.rst

   Bypasses the validation checks for SSL certificates on other servers
   in the cluster and allows the use of invalid certificates. When
   using the :setting:`sslAllowInvalidCertificates` setting, MongoDB
   logs as a warning the use of the invalid certificate.
