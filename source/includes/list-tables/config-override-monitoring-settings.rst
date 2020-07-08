.. list-table::
   :widths: 40 10 50
   :header-rows: 1
   :stub-columns: 1

   * - Backup Setting
     - Data Type
     - Data Entry

   * - :msetting:`mmsGroupId`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "mmsGroupId" : "8zvbo2s2asigxvmpnkq5yexf"
          }
   * - :msetting:`mmsApiKey`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "mmsApiKey" : "rgdte4w7wwbnds9nceuodx9mcte2zqem"
          }
   * - :msetting:`mmsBaseUrl`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "mmsBaseUrl" : "http://example.com:8080"
          }
   * - :msetting:`logFile`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "logFile" : "/etc/mongodb-mms/logs/backup-agent.log"
          }
   * - :msetting:`maxLogFileSizeBytes`
     -
     -
       .. code-block:: json

          "configOverrides": {
            "maxLogFileSizeBytes" : "536870912"
          }
   * - :msetting:`maxLogFileDurationHrs`
     -
     -
       .. code-block:: json

          "configOverrides": {
            "maxLogFileDurationHrs" : "10.5"
          }
   * - :msetting:`httpProxy`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "httpProxy" : "http://proxy.example.com:8080"
          }
   * - :msetting:`krb5Principal`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "krb5Principal" : "mmsagent/myhost@EXAMPLE.COM"
          }
   * - :msetting:`krb5Keytab`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "krb5Keytab" : "/path/to/monitoring-agent.keytab"
          }
   * - :msetting:`krb5ConfigLocation`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "krb5ConfigLocation" : "/path/to/krb_custom.conf"
          }
   * - :msetting:`gssapiServiceName`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "gsappiServiceName" : "mongodb"
          }
   * - :msetting:`useSslForAllConnections`
     - boolean
     -
       .. code-block:: json

          "configOverrides": {
            "useSslForAllConnections" : true
          }
   * - :msetting:`sslClientCertificate`
     - string
     -
       .. code-block:: json

          "configOverrides": {
             "sslClientCertificate" : "<certDirectory>/sslCertificate.pem"

          }
   * - :msetting:`sslClientCertificatePassword`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "sslClientCertificatePassword" : "password"
          }
   * - :msetting:`sslTrustedServerCertificates`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "sslTrustedServerCertificates" : "/path/to/mongodb-certs.pem"
          }
   * - :msetting:`sslRequireValidServerCertificates`
     - boolean
     -
       .. code-block:: json

          "configOverrides": {
            "sslRequireValidServerCertificates" : true
          }
   * - :msetting:`httpsCAFile`
     - string
     -
       .. code-block:: json

          "configOverrides": {
            "sslTrustedMMSBackupServerCertificate" : "/path/to/mms-certs.pem"
          }
   * - :msetting:`enableMunin`
     - boolean
     -
       .. code-block:: json

          "configOverrides": {
            "enableMunin" : true
          }
