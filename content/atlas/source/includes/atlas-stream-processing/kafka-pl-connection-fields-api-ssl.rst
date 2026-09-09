.. list-table::
   :widths: 34 15 51
   :header-rows: 1

   * - Key
     - Necessity
     - Value

   * - ``name``
     - Required
     - Name for the connection. Each connection name must be
       unique within a {+spw+}.

   * - ``type``
     - Required
     - ``"Kafka"``

   * - ``bootstrapServers``
     - Required
     - One or more bootstrap servers for your {+kafka+} system. Each
       server must include a port, as in
       ``broker.example.com:9092``. To specify multiple servers,
       separate them with commas.

   * - ``networking.access.type``
     - Required
     - ``"PRIVATE_LINK"``

   * - ``networking.access.connectionId``
     - Required
     - ``_id`` value from your Private Link request response.

   * - ``security.protocol``
     - Required
     - ``"SSL"``

   * - ``security.brokerPublicCertificate``
     - Optional
     - Trusted public x509 certificate for connecting to
       {+kafka+} over SSL.

   * - ``authentication.sslCertificate``
     - Required
     - Your client SSL certificate for mTLS authentication.

   * - ``authentication.sslKey``
     - Required
     - Your client SSL key for mTLS authentication.

   * - ``authentication.sslKeyPassword``
     - Optional
     - Password for your client SSL key. Provide this value only
       if your key is password-protected.

   * - ``config``
     - Optional
     - Additional {+kafka+} configuration properties as key-value
       pairs.

Set all other values as necessary.
