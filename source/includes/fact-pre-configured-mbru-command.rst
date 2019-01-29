.. admonition:: Pre-configured ``mongodb-backup-restore-util`` command
   :class: important

   |mms| provides the ``mongodb-backup-restore-util`` with the
   appropriate options for your restore on the restore panel under
   :guilabel:`Run Binary with PIT Options`.

   You should copy the ``mongodb-backup-restore-util`` command
   provided in the |application|.

.. cond:: cloud

   .. code-block:: sh

      ./mongodb-backup-restore-util --https --host <targetHost> \
        --port <targetPort> \
        --opStart <opLogStartTimeStamp> \
        --opEnd <opLogEndTimeStamp> \
        --logFile <logPath> \
        --apiKey <apiKey> \
        --groupId <groupId> \
        --rsId <rsId> \
        --whitelist <database1.collection1, database2, etc.> \
        --blacklist <database1.collection1, database2, etc.> \
        --seedReplSetMember \
        --oplogSizeMB <size> \
        --seedTargetPort <port> \
        --ssl \
        --sslCAFile </path/to/ca.pem> \
        --sslPEMKeyFile </path/to/pemkey.pem>
        --sslClientCertificateSubject <distinguishedName> \
        --sslRequireValidServerCertificates <true|false> \
        --sslServerClientCertificate </path/to/client.pem> \
        --sslServerClientCertificatePassword <password> \
        --sslRequireValidMMSBackupServerCertificate <true|false> \
        --sslTrustedMMSBackupServerCertificate </path/to/mms-certs.pem> \
        --httpProxy <proxyURL>

.. cond:: onprem

   .. code-block:: sh

      ./mongodb-backup-restore-util --https --host <targetHost> \
        --port <targetPort> \
        --opStart <opLogStartTimeStamp> \
        --opEnd <opLogEndTimeStamp> \
        --logFile <logPath> \
        --oplogSourceAddr <oplogSourceAddr> \
        --apiKey <apiKey> \
        --groupId <groupId> \
        --rsId <rsId> \
        --whitelist <database1.collection1, database2, etc.> \
        --blacklist <database1.collection1, database2, etc.> \
        --seedReplSetMember \
        --oplogSizeMB <size> \
        --seedTargetPort <port> \
        --ssl \
        --sslCAFile </path/to/ca.pem> \
        --sslPEMKeyFile </path/to/pemkey.pem>
        --sslClientCertificateSubject <distinguishedName> \
        --sslRequireValidServerCertificates <true|false> \
        --sslServerClientCertificate </path/to/client.pem> \
        --sslServerClientCertificatePassword <password> \
        --sslRequireValidMMSBackupServerCertificate <true|false> \
        --sslTrustedMMSBackupServerCertificate </path/to/mms-certs.pem> \
        --httpProxy <proxyURL>
