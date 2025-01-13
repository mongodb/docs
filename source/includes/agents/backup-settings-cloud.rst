.. _backup-connection-settings:

Connection Settings
```````````````````

.. bsetting:: mmsGroupId

   *Type*: string

   Specifies the ID of your |mms| project. Find the project ID on the
   :guilabel:`Project Settings` page (:guilabel:`Settings` >
   :guilabel:`Project Settings`).

   .. code-block:: ini

      mmsGroupId=8zvbo2s2asigxvmpnkq5yexf

.. bsetting:: mmsApiKey

   *Type*: string

   Specifies the {+mdbagent+} |api| key of your |mms| project.

   .. include:: /includes/extracts/agent-api-key-specify.rst

   |mms| configures this setting when you install the {+mdbagent+}. If
   you need to configure {+bagent+} separately, include this setting.

   .. code-block:: ini

      mmsApiKey=rgdte4w7wwbnds9nceuodx9mcte2zqem

.. bsetting:: mothership

   *Type*: string

   Specifies the hostname and port of the |application|.

   .. note::

      Don't include the protocol (``http://`` or ``https://``) in the
      :bsetting:`mothership` setting.

   .. code-block:: ini

      mothership=example.com:8080

.. bsetting:: mothershipResponseHeaderTimeout

   *Type*: integer

   Specifies the length of time in seconds {+bagent+} waits for the
   |application| to respond. If the {+mdbagent+} doesn't get a
   response, it resets and retries the connection to the |application|.
   This value defaults to ``90`` seconds.

.. bsetting:: backupSocketTimeoutMs

   *Type*: integer

   Specifies the length of time, in milliseconds, that a socket between
   {+bagent+} and |mms| can remain idle before |mms| breaks the
   connection. If omitted, defaults to ``180000`` milliseconds (``3``
   minutes). 

.. bsetting:: https

   *Type*: boolean

   Specifies whether or not communication with the |mms| web server
   uses Secure |http|.

HTTP Proxy Settings
```````````````````

.. bsetting:: httpProxy

   *Type*: string

   Specifies the |url| of an |http| proxy that {+bagent+} can use.

   .. code-block:: ini

      httpProxy=http://proxy.example.com:8080

.. _backup-mongodb-kerberos-settings:

MongoDB Kerberos Settings
`````````````````````````

To configure Kerberos, see
:doc:`/tutorial/configure-mongodb-agent-for-kerberos`. The same
procedures and requirements apply, only use a different |upn| for
{+bagent+}.

.. include:: /includes/fact-set-krb5ccname.rst

.. bsetting:: krb5Principal

   *Type*: string

   Specifies the Kerberos principal that {+bagent+} uses.

   .. code-block:: ini

      krb5Principal=backup/myhost@EXAMPLE.COM

.. bsetting:: krb5Keytab

   *Type*: string

   Specifies the *absolute* path to Kerberos principal's keytab file.

   .. code-block:: ini

      krb5Keytab=/path/to/mms-backup.keytab

.. bsetting:: krb5ConfigLocation

   *Type*: string

   Specifies the *absolute* path to an non-system-standard location for
   the Kerberos configuration file.

   .. code-block:: ini

      krb5ConfigLocation=/path/to/krb_custom.conf

.. bsetting:: gsappiServiceName

   *Type*: string

   Specifies the service name with the :bsetting:`gsappiServiceName`
   setting.

   *By default, MongoDB uses* ``mongodb`` *as its service name.*

.. _backup-mongodb-ssl-settings:

MongoDB TLS Settings
````````````````````

Specify these settings when {+bagent+} connects to MongoDB deployments
using |tls|.

To learn more, see
:doc:`/tutorial/configure-mongodb-agent-for-tls`.

.. bsetting:: sslClientCertificate

   *Type*: string

   Specifies the path to the private key, client certificate, and
   optional intermediate certificates in |pem| format. {+bagent+}
   uses the client certificate when connecting to a MongoDB deployment
   that uses |tls| and requires client certificates. (The deployment
   runs with the
   :manual:`--tlsCAFile </reference/program/mongod/#std-option-mongod.--tlsCAFile>` setting.)

.. bsetting:: sslClientCertificatePassword

   *Type*: string

   Specifies the password needed to decrypt the private key in the
   :bsetting:`sslClientCertificate` file. Include this setting if you
   encrypted the client certificate |pem| file.

.. .. bsetting:: sslClientCertificateSubject
.. 
..    *Type*: string
.. 
..    Specifies the certificate's subject, which contains the
..    Distinguished Name (DN). If not set, |mms| extracts this value 
..    from the certificate.

.. bsetting:: sslTrustedServerCertificates

   *Type*: string

   Specifies the path that contains the trusted CA certificates in
   |pem| format. These certificates verify the server certificate
   returned from any MongoDB deployments running with |tls|.

   .. code-block:: ini

      sslTrustedServerCertificates=/path/to/mongodb-certs.pem

.. bsetting:: sslRequireValidServerCertificates

   *Type*: boolean

   Specifies if {+bagent+} should validate |tls| certificates
   presented by the MongoDB deployments.

   .. warning::

      Changing this setting to ``false`` disables certificate
      verification and makes connections between {+bagent+} and MongoDB
      deployments susceptible to *man-in-the-middle* attacks. Change
      this setting to ``false`` only for testing purposes.

.. _backup-server-ssl-settings:

|mms| Server TLS Settings
`````````````````````````

Specify the settings {+bagent+} use when communicating with |mms| using
|tls|.

.. bsetting:: sslTrustedMMSBackupServerCertificate

   Specifies the *absolute* path that contains the trusted |certauth|
   certificates in |pem| format. {+bagent+} uses this certificate to
   verify that the {+mdbagent+} can communicate with the designated
   |mms| instance.

   *By default, {+bagent+} uses the trusted root* |certauth-plural|
   *installed on the system.*

   If {+bagent+} cannot find the trusted root |certauth-plural|, configure
   these settings manually.

   If |mms| use a self-signed |tls| certificate, provide a value for
   this setting.

   .. code-block:: ini

      sslTrustedMMSBackupServerCertificate=/path/to/mms-certs.pem
