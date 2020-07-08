.. list-table::
   :widths: 40 10 50
   :header-rows: 1
   :stub-columns: 1

   * - Backup Setting
     - Data Type
     - Data Entry

   * - :bsetting:`mmsGroupId`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "mmsGroupId" : "8zvbo2s2asigxvmpnkq5yexf"
          }

   * - :bsetting:`mmsApiKey`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "mmsApiKey" : "rgdte4w7wwbnds9nceuodx9mcte2zqem"
          }

   * - :bsetting:`mothership`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "mothership" : "opsmanager.example.com:8080"
          }

   * - :bsetting:`mothershipResponseHeaderTimeout`
     - integer
     -
       .. code-block:: json

          "configOverrides": {
            "mothershipResponseHeaderTimeout" : "5"
          }

   * - :bsetting:`https`
     - boolean
     -
       .. code-block:: json

          "configOverrides": {
            "https" : true
          }

   * - :bsetting:`logFile`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "logFile" : "/etc/mongodb-mms/logs/backup-agent.log"
          }

   * - :bsetting:`maxLogFileSizeBytes`
     - integer
     -
       .. code-block:: json

          "configOverrides": {
            "maxLogFileSizeBytes" : "536870912"
          }

   * - :bsetting:`maxLogFileDurationHrs`
     - float
     -
       .. code-block:: json

          "configOverrides": {
            "maxLogFileDurationHrs" : "10.5"
          }

   * - :bsetting:`httpProxy`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "httpProxy" : "http://proxy.example.com:8080"
          }

   * - :bsetting:`krb5Principal`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "krb5Principal" : "mmsagent/myhost@EXAMPLE.COM"
          }

   * - :bsetting:`krb5Keytab`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "krb5Keytab" : "/path/to/backup-agent.keytab"
          }

   * - :bsetting:`krb5ConfigLocation`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "krb5ConfigLocation" : "/path/to/krb_custom.conf"
          }

   * - :bsetting:`gsappiServiceName`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "gsappiServiceName" : "mongodb"
          }

   * - :bsetting:`sslClientCertificate`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "sslClientCertificate" : "<certDirectory>/sslCertificate.pem"
          }

   * - :bsetting:`sslClientCertificatePassword`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "sslClientCertificatePassword" : "password"
          }

   * - :bsetting:`sslClientCertificateSubject`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "sslClientCertificateSubject" : "CN=test,O=Test Certificate"
          }

   * - :bsetting:`sslTrustedServerCertificates`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "sslTrustedServerCertificates" : "/path/to/mongodb-certs.pem"
          }

   * - :bsetting:`sslRequireValidServerCertificates`
     - boolean
     -
       .. code-block:: json

          "configOverrides": {
            "sslRequireValidServerCertificates" : true
          }

   * - :bsetting:`sslTrustedMMSBackupServerCertificate`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "sslTrustedMMSBackupServerCertificate" : "/path/to/mms-certs.pem"
          }
