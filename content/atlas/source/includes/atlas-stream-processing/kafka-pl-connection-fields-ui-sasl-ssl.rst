.. list-table::
   :widths: 30 15 55
   :header-rows: 1

   * - Field
     - Necessity
     - Description

   * - :guilabel:`Connection Name`
     - Required
     - Name for the connection. Each connection name must be
       unique within a {+spw+}. This is the name used to
       reference the connection in {+atlas-sp+}
       :ref:`aggregations <atlas-sp-aggregation>`.

   * - :guilabel:`Network Access`
     - Required
     - Select :guilabel:`PrivateLink`, toggle :guilabel:`Enable
       PrivateLink networking` on, and select the private
       endpoint you created earlier from the dropdown menu.

   * - :guilabel:`Bootstrap Servers`
     - Required
     - One or more `bootstrap servers
       <https://kafka.apache.org/documentation/#streamsconfigs_bootstrap.servers>`__
       for your {+kafka+} system. Each server must include a port, as
       in ``broker.example.com:9092``. To specify multiple servers,
       separate them with commas.

   * - :guilabel:`Security Protocol Method`
     - Required
     - Set to ``SASL_SSL``.

   * - :guilabel:`SASL Mechanism`
     - Required
     - Authentication mechanism to use. {+atlas-sp+} supports:

       - ``PLAIN``
       - ``SCRAM-SHA-256``
       - ``SCRAM-SHA-512``
       - ``OAUTHBEARER``
       - ``AWS MSK IAM``

       If your {+aws-msk+} private endpoint uses the ``TLS``
       authentication scheme, the ``SCRAM-SHA-256`` and
       ``SCRAM-SHA-512`` mechanisms aren't available.

       For {+aws-msk+} private endpoints, {+atlas-sp+} also supports
       the ``AWS MSK IAM`` mechanism.

   * - :guilabel:`Certificate Authority PEM file`
     - Optional
     - Trusted public x509 certificate for connecting to
       {+kafka+} over SSL. Upload your certificate if you aren't
       using the default one.

   * - :guilabel:`Username`
     - Conditional
     - Username for authentication. Required if you set
       :guilabel:`SASL Mechanism` to ``PLAIN``,
       ``SCRAM-SHA-256``, or ``SCRAM-SHA-512``.

   * - :guilabel:`Password`
     - Conditional
     - Password for authentication. Required if you set
       :guilabel:`SASL Mechanism` to ``PLAIN``,
       ``SCRAM-SHA-256``, or ``SCRAM-SHA-512``.

   * - :guilabel:`Client ID`
     - Conditional
     - Public identifier for the {+kafka+} client. Required if
       you set :guilabel:`SASL Mechanism` to ``OAUTHBEARER``.

   * - :guilabel:`Client secret`
     - Conditional
     - Secret known only to the {+kafka+} client and the
       authorization server. Required if you set :guilabel:`SASL
       Mechanism` to ``OAUTHBEARER``.

   * - :guilabel:`Token endpoint URL`
     - Conditional
     - OAUTH issuer token endpoint URI used to retrieve the
       token. Required if you set :guilabel:`SASL Mechanism` to
       ``OAUTHBEARER``.

   * - :guilabel:`Scope`
     - Optional
     - Scope of the access request to the broker. Applies only
       when you set :guilabel:`SASL Mechanism` to
       ``OAUTHBEARER``. Use commas to separate multiple scopes.

   * - :guilabel:`Extensions`
     - Optional
     - Additional information to provide to the {+kafka+} broker.
       Applies only when you set :guilabel:`SASL Mechanism` to
       ``OAUTHBEARER``.

   * - :guilabel:`IAM Role ARN`
     - Conditional
     - ARN of the {+aws+} IAM role that {+service+} assumes to
       authenticate with your MSK cluster. Required if you set
       :guilabel:`SASL Mechanism` to ``AWS MSK IAM``. Applies only to
       {+aws-msk+} connections.

   * - :guilabel:`Configuration File`
     - Optional
     - Additional {+kafka+} configuration properties as key-value
       pairs.
