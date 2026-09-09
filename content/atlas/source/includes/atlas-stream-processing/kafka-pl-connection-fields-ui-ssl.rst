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
     - Set to ``SSL``. This method authenticates with mutual TLS.

   * - :guilabel:`Certificate Authority PEM file`
     - Optional
     - Trusted public x509 certificate for connecting to
       {+kafka+} over SSL. Upload your certificate if you aren't
       using the default one.

   * - :guilabel:`SSL certificate file`
     - Required
     - Your client SSL certificate for mTLS authentication.

   * - :guilabel:`SSL key file`
     - Required
     - Your client SSL key for mTLS authentication.

   * - :guilabel:`Client key password`
     - Optional
     - Password for your client SSL key. Provide this value only
       if your key is password-protected.

   * - :guilabel:`Configuration File`
     - Optional
     - Additional {+kafka+} configuration properties as key-value
       pairs.
