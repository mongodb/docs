Connection Settings
```````````````````

.. msetting:: mmsGroupId

   *Type*: string

   Specifies the ID of your |mms| project. Find the project ID on the
   :guilabel:`Project Settings` page (:guilabel:`Settings` >
   :guilabel:`Project Settings`).

   |mms| configures this setting when you install the {+mdbagent+}. If
   you need to configure {+magent+} separately, include this setting to
   bind the server to a project.

   .. code-block:: ini

      mmsGroupId=8zvbo2s2asigxvmpnkq5yexf

.. msetting:: mmsApiKey

   *Type*: string

   Specifies the {+mdbagent+} |api| key of your |mms| project.

   .. include:: /includes/extracts/agent-api-key-specify.rst

   |mms| configures this setting when you install the {+mdbagent+}. If
   you need to configure {+magent+} separately, include this setting.

   .. code-block:: ini

      mmsApiKey=rgdte4w7wwbnds9nceuodx9mcte2zqem

.. msetting:: mmsBaseUrl

   *Type*: string

   Specifies the |url| of the |application|.

   .. code-block:: ini

      mmsBaseUrl=http://example.com:8080

HTTP Proxy Settings
```````````````````

.. msetting:: httpProxy

   *Type*: string

   Specifies the |url| of an |http| proxy server that {+magent+} can
   use.

   .. code-block:: ini

      httpProxy=http://proxy.example.com:8080

.. _monitoring-agent-otel-settings:

OpenTelemetry (OTel) Export Settings
`````````````````````````````````````

Specify this setting to send deployment metrics to a third-party
OpenTelemetry (OTel) backend, in addition to |mms|. To learn more,
see :ref:`otel-integration-mms`.

.. msetting:: otelConfig

   *Type*: string (JSON-encoded)

   Specifies the OTel export configuration as a single JSON-encoded
   string. The JSON object has the following fields:

   .. list-table::
      :widths: 25 12 15 48
      :header-rows: 1

      * - Field
        - Type
        - Necessity
        - Description

      * - ``enabled``
        - boolean
        - Optional
        - Enables or disables the OTel export path. Defaults to
          ``false``.

      * - ``metricsExportIntervalSec``
        - integer
        - Optional
        - Export cadence in seconds. Defaults to ``30``.

      * - ``backends``
        - array
        - Required when ``enabled`` is ``true``
        - Array of OTLP metric backends. Exactly one backend is
          supported in this release. Configuring more than one
          backend results in a hard error.

      * - ``backends[].endpoint``
        - string
        - Required when ``enabled`` is ``true``
        - OTLP/HTTP endpoint |url|. Must include an ``http://`` or
          ``https://`` scheme. The scheme determines whether
          {+mdbagent+} uses |tls|.

      * - ``backends[].headers``
        - string
        - Optional
        - Comma-separated ``key=value`` request headers, such as
          authentication tokens required by the backend. Values can
          be encrypted at rest. To learn more, see
          :ref:`automation-config-encryption`.

      * - ``backends[].compression``
        - string
        - Optional
        - Payload compression for export requests: ``none`` or
          ``gzip``. Defaults to ``none``.

      * - ``backends[].caCertPath``
        - string
        - Optional
        - Path to a |certauth| certificate |pem| file used to verify
          the endpoint's |tls| certificate, such as a self-signed
          Collector certificate.

      * - ``backends[].clientCertPath``
        - string
        - Optional
        - Path to a client certificate |pem| file for mutual |tls|
          (mTLS). Must be set together with
          ``backends[].clientKeyPath``.

      * - ``backends[].clientKeyPath``
        - string
        - Optional
        - Path to the client private key |pem| file for mutual |tls|
          (mTLS). Must be set together with
          ``backends[].clientCertPath``.

      * - ``backends[].clientKeyPassword``
        - string
        - Optional
        - Password used to decrypt the client private key |pem|
          file, if encrypted. Requires ``backends[].clientCertPath``
          and ``backends[].clientKeyPath`` to be set.

   .. code-block:: ini

      otelConfig={"enabled":true,"metricsExportIntervalSec":30,"backends":[{"endpoint":"https://collector.example.com:4318","headers":"Authorization=Bearer <token>","caCertPath":"/etc/ssl/ca.pem"}]}

MongoDB Kerberos Settings
`````````````````````````

Specify these settings if {+magent+} authenticates to hosts
using Kerberos.

To configure Kerberos, see
:doc:`/tutorial/configure-mongodb-agent-for-kerberos`. The same
procedures and requirements apply, only use a different |upn| for
{+magent+}.

.. include:: /includes/fact-set-krb5ccname.rst

.. msetting:: krb5Principal

   *Type*: string

   Specifies the Kerberos principal that {+magent+} uses.

   .. code-block:: ini

      krb5Principal=monitoring/myhost@EXAMPLE.COM

.. msetting:: krb5Keytab

   *Type*: string

   Specifies the *absolute* path to Kerberos principal's ``keytab``
   file.

   .. code-block:: ini

      krb5Keytab=/path/to/mms-monitoring.keytab

.. msetting:: krb5ConfigLocation

   *Type*: string

   Specifies the *absolute* path to an non-system-standard location for
   the Kerberos configuration file.

   .. code-block:: ini

      krb5ConfigLocation=/path/to/krb_custom.conf

.. msetting:: gssapiServiceName

   *Type*: string

   Specifies the service name with the :msetting:`gssapiServiceName`
   setting.

   *By default, MongoDB uses* ``mongodb`` *as its service name.*

MongoDB TLS Settings
````````````````````

Specify these settings when {+magent+} connects to MongoDB
deployments using |tls|. 

To learn more, see
:doc:`/tutorial/configure-mongodb-agent-for-tls`.

.. msetting:: useSslForAllConnections

   *Type*: boolean

   Specifies whether or not to encrypt **all** connections to MongoDB
   deployments using |tls|.

   .. important::

      Setting this to ``true`` overrides any
      per-host |tls| settings configured in the |mms| interface.

.. msetting:: sslClientCertificate

   *Type*: string

   Specifies the *absolute* path to the private key, client
   certificate, and optional intermediate certificates in |pem|
   format. {+magent+} uses the client certificate to connect to any
   configured MongoDB deployment that uses |tls| and requires client
   certificates. (The deployment runs with the
   :option:`--tlsCAFile <mongod --tlsCAFile>` setting.)

   .. example::

      If you want to connect to a MongoDB deployment that uses both
      |tls| and certificate validation using {+mongosh+}:

      .. code-block:: sh

         mongosh --tls --tlsCertificateKeyFile /path/to/client.pem --tlsCAFile /path/to/ca.pem example.net:27017

      You must set these settings in your :guilabel:`Custom Settings`:

      .. code-block:: ini

         sslTrustedServerCertificates=/path/to/ca.pem
         sslClientCertificate=/path/to/client.pem

.. msetting:: sslClientCertificatePassword

   *Type*: string

   Specifies the password needed to decrypt the private key in
   the :msetting:`sslClientCertificate` file.  Include this setting if you encrypted the client certificate |pem| file.

   .. code-block:: ini

      sslClientCertificatePassword=password

.. msetting:: sslTrustedServerCertificates

   *Type*: string

   Specifies the *absolute* path that contains the trusted |certauth|
   certificates in |pem| format. These certificates verify the server
   certificate returned from any MongoDB deployments running with |tls|.

   .. code-block:: ini

      sslTrustedServerCertificates=/path/to/ca.pem

.. msetting:: sslRequireValidServerCertificates

   *Type*: boolean

   Specifies whether {+magent+} should validate the |tls| certificates
   that the MongoDB databases present.

   .. code-block:: ini

      sslRequireValidServerCertificates=true

   .. include:: /includes/agents/sslRequireValidServerCertificates-monitoring.rst

.. _monitoring-server-ssl-settings:

|mms| Server TLS Settings
`````````````````````````

Specify the settings {+magent+} use when communicating with |mms| using
|tls|.

.. msetting:: httpsCAFile

   *Type*: string

   Specifies the *absolute* path that contains the trusted |certauth|
   certificates in |pem| format. {+magent+} uses this certificate to
   verify that the agent can communicate with the designated |mms|
   instance.

   *By default, {+magent+} uses the trusted root* |certauth-plural|
   *installed on the host.*

   If the agent cannot find the trusted root |certauth-plural|, configure
   these settings manually.

   If the |mms| instance uses a self-signed |tls| certificate, you
   *must* specify a :msetting:`httpsCAFile` value.

   .. code-block:: ini

      httpsCAFile=/path/to/mms-certs.pem

.. msetting:: sslRequireValidMMSServerCertificates

   *Type*: boolean

   Specifies if {+magent+} should validate |tls| certificates from
   |mms|.

   .. warning::

      Changing this setting to ``false`` disables certificate
      verification and makes connections between {+magent+} and |mms|
      susceptible to *man-in-the-middle* attacks. Change this setting
      to ``false`` only for testing purposes.

.. msetting:: sslServerClientCertificate

   *Type*: string

   Specifies the path to the file containing the client's private key,
   certificate, and optional intermediate certificates in |pem|
   format. {+magent+} uses the client certificate when connecting to
   |onprem| over |tls| if |onprem| requires client certificates, such
   as when |onprem| runs with :setting:`Client Certificate Mode` set to
   ``Required for Agents Only`` or ``Required for All Requests``.

   .. seealso::
      
      To learn how to specify this setting in the |application|, see
      :setting:`Client Certificate Mode` in
      :doc:`/reference/configuration`.

   .. code-block:: ini

      sslServerClientCertificate=/path/to/client.pem

.. msetting:: sslServerClientCertificatePassword

   Specifies the password needed to decrypt the private key in the
   :msetting:`sslServerClientCertificate` file. Include this setting if
   you encrypted the client certificate |pem| file.

   .. code-block:: ini

      sslServerClientCertificatePassword=password
