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
     - ``"SASL_SSL"``

   * - ``security.brokerPublicCertificate``
     - Optional
     - Trusted public x509 certificate for connecting to
       {+kafka+} over SSL.

   * - ``authentication.mechanism``
     - Required
     - One of ``"PLAIN"``, ``"SCRAM-256"``, ``"SCRAM-512"``,
       ``"OAUTHBEARER"``, ``"AWS_MSK_IAM"``, or ``""``.

       If your {+aws-msk+} private endpoint uses the ``TLS``
       authentication scheme, the ``"SCRAM-256"`` and
       ``"SCRAM-512"`` mechanisms aren't available. To enable
       ``mTLS``, set this field to an empty string ``""``.

       For {+aws-msk+} private endpoints, {+atlas-sp+} also supports
       the ``"AWS_MSK_IAM"`` mechanism.

   * - ``authentication.username``
     - Conditional
     - Username for authentication. Required if you set
       ``authentication.mechanism`` to ``"PLAIN"``,
       ``"SCRAM-256"``, or ``"SCRAM-512"``.

   * - ``authentication.password``
     - Conditional
     - Password for authentication. Required if you set
       ``authentication.mechanism`` to ``"PLAIN"``,
       ``"SCRAM-256"``, or ``"SCRAM-512"``.

   * - ``authentication.method``
     - Conditional
     - ``"OIDC"``. Required if you set
       ``authentication.mechanism`` to ``"OAUTHBEARER"``.

   * - ``authentication.clientId``
     - Conditional
     - Public identifier for the {+kafka+} client. Required if
       you set ``authentication.mechanism`` to
       ``"OAUTHBEARER"``.

   * - ``authentication.clientSecret``
     - Conditional
     - Secret known only to the {+kafka+} client and the
       authorization server. Required if you set
       ``authentication.mechanism`` to ``"OAUTHBEARER"``.

   * - ``authentication.tokenEndpointUrl``
     - Conditional
     - OAUTH issuer token endpoint URI used to retrieve the
       token. Required if you set ``authentication.mechanism``
       to ``"OAUTHBEARER"``.

   * - ``authentication.scope``
     - Optional
     - Scope of the access request to the broker. Applies only
       when you set ``authentication.mechanism`` to
       ``"OAUTHBEARER"``.

   * - ``authentication.saslOauthbearerExtensions``
     - Optional
     - Additional information to provide to the {+kafka+} broker.
       Applies only when you set ``authentication.mechanism`` to
       ``"OAUTHBEARER"``.

   * - ``authentication.aws.roleArn``
     - Conditional
     - ARN of the {+aws+} IAM role that {+service+} assumes to
       authenticate with your MSK cluster. Required if you set
       ``authentication.mechanism`` to ``"AWS_MSK_IAM"``. Applies
       only to {+aws-msk+} connections.

   * - ``config``
     - Optional
     - Additional {+kafka+} configuration properties as key-value
       pairs.

Set all other values as necessary.
