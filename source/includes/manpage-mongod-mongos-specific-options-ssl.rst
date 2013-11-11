.. use |binary-name| to refer to ``mongos``/``mongod``.

.. option:: --sslOnNormalPorts

   .. versionadded:: 2.2

   .. versionadded:: 2.5.3
      SSL support added to Windows Enterprise.

   .. include:: /includes/note-general-ssl-support.rst

   Enables SSL for |binary-name|. With :option:`--sslOnNormalPorts`,
   a |binary-name| requires SSL encryption for all connections on the
   default MongoDB port, or the port specified by :option:`--port`. By
   default, :option:`--sslOnNormalPorts` is disabled.

.. option:: --sslWeakCertificateValidation

   .. versionadded:: 2.4

   .. versionadded:: 2.5.3
      SSL support added to Windows Enterprise.

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

     * - ``keyfile``

       - Default value. Use keyfile for authentication.

     * - ``sendKeyfile``

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


