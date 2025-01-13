Connection Settings
```````````````````

.. msetting:: mmsGroupId

   *Type*: string

   Specifies the ID of your |mms| project. Find the project ID on the
   :guilabel:`Project Settings` page (:guilabel:`Settings` >
   :guilabel:`Project Settings`).

   .. code-block:: ini

      mmsGroupId=8zvbo2s2asigxvmpnkq5yexf

.. msetting:: mmsApiKey

   *Type*: string

   Specifies the |mms| agent API key of your |mms| project.

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

Specify these settings when {+magent+} connects to MongoDB deployments
using |tls|.

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
   :manual:`--tlsCAFile </reference/program/mongod/#std-option-mongod.--tlsCAFile>` setting.)

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

   Specifies the password needed to decrypt the private key in the
   :msetting:`sslClientCertificate` file. Include this setting if you encrypted
   the client certificate |pem| file.

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
   presented by the MongoDB databases.

   .. code-block:: ini

      sslRequireValidServerCertificates=true

   .. include:: /includes/agents/sslRequireValidServerCertificates-monitoring.rst

|mms| Server TLS Settings
`````````````````````````

Specify the settings {+magent+} uses when communicating with |mms|
using |tls|.

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

   .. code-block:: ini

      httpsCAFile=/path/to/mms-certs.pem

