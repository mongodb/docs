.. list-table::
   :widths: 35 10 40 5
   :header-rows: 1

   * - Option
     - Necessity
     - Description
     - :icon:`check-circle`

   * - ``--host``
     - Required
     - Provide the hostname, |fqdn|, |ipv4| address, or |ipv6| address
       for the host that serves the :program:`mongod` to which the
       :term:`oplog <Oplog Store Database>` should be applied. If you
       copied the ``mongodb-backup-restore-util`` command provided in
       the |application|, this field is pre-configured.
     - :icon:`check-circle`

   * - ``--port``
     - Required
     - Provide the port for the host that serves the |mongod| to which
       the :term:`oplog <Oplog Store Database>` should be applied.
     - :icon:`check-circle`

   * - ``--opStart``
     - Required
     - Provide the
       :ref:`BSON timestamp <document-bson-type-timestamp>`
       for the first :term:`oplog <Oplog Store Database>` entry
       you want to include in the restore.

       .. note::

          This value must be less than or equal to the ``--opEnd``
          value.

     - :icon:`check-circle`

   * - ``--opEnd``
     - Required
     - Provide the
       :ref:`BSON timestamp <document-bson-type-timestamp>`
       for the last :term:`oplog <Oplog Store Database>` entry
       you want to include in the restore.

       .. note:: This value cannot be greater than the end of the oplog.

     - :icon:`check-circle`

   * - ``--logFile``
     - Optional
     - Provide a path, including file name, where the
       :abbr:`MBRU (MongoDB Backup Restore Utility)` log is
       written.
     -

   * - ``--oplogSourceAddr``
     - Required
     - Provide the |url| for the |mms| resource endpoint.
     - :icon:`check-circle`

   * - ``--apiKey``
     - Required
     - Provide your |mms| Agent
       :doc:`API Key </tutorial/manage-agent-api-key>`.
     - :icon:`check-circle`

   * - ``--groupId``
     - Required
     - Provide the :term:`group` ID.
     - :icon:`check-circle`

   * - ``--rsId``
     - Required
     - Provide the :term:`replica set` ID.
     - :icon:`check-circle`

   * - ``--whitelist``
     - Optional
     - Provide a list of databases and/or collections to which you
       want to limit the restore.
     -

   * - ``--blacklist``
     - Optional
     - Provide a list of databases and/or collections to which you
       want to exclude from the restore.
     -

   * - ``--seedReplSetMember``
     - Optional
     - Use if you need a replica set member to re-create the
       :term:`oplog <Oplog Store Database>` collection and seed
       it with the correct timestamp.

       Requires ``--oplogSizeMB`` and ``--seedTargetPort``.
     -

   * - ``--oplogSizeMB``
     - Conditional
     - Provide the :term:`oplog <Oplog Store Database>` size in MB.

       Required if ``--seedReplSetMember`` is set.
     -

   * - ``--seedTargetPort``
     - Conditional
     - Provide the port for the :term:`replica set`'s
       :term:`primary`. This may be different from the `ephemeral
       port <https://en.wikipedia.org/wiki/Ephemeral_port?oldid=797306581>`_
       used.

       Required if ``--seedReplSetMember`` is set.
     -

   * - ``--ssl``
     - Optional
     - Use if you need |tls-ssl| to apply the
       :term:`oplog <Oplog Store Database>` to the |mongod|.

       Requires ``--sslCAFile`` and ``--sslPEMKeyFile``.
     -

   * - ``--sslCAFile``
     - Conditional
     - Provide the path to the |certauth| file.

       Required if ``--ssl`` is set.
     -

   * - ``--sslPEMKeyFile``
     - Conditional
     - Provide the path to the |pem| certificate file.

       Required if ``--ssl`` is set.
     -

   * - ``--sslPEMKeyFilePwd``
     - Conditional
     - Provide the password for the |pem| certificate file specified
       in ``--sslPEMKeyFile``.

       Required if ``--ssl`` is set and that |pem| key file is
       encrypted.
     -

   * - ``--sslClientCertificateSubject``
     - Optional
     - Provide the Client Certificate Subject or Distinguished Name
       (DN) for the target MongoDB process.

       Required if ``--ssl`` is set.
     -

   * - ``--sslRequireValidServerCertificates``
     - Optional
     - Set a flag indicating if the tool should validate certificates
       that the target MongoDB process presents.
     -

   * - ``--sslServerClientCertificate``
     - Optional
     - Provide the absolute path to Client Certificate file to use for
       connecting to the |mms| host.
     -

   * - ``--sslServerClientCertificatePassword``
     - Conditional
     - Provide the absolute path to Client Certificate file password to
       use for connecting to the |mms| host.

       Required if ``--sslServerClientCertificate`` is set and that
       certificate is encrypted.
     -

   * - ``--sslRequireValidMMSBackupServerCertificate``
     - Optional
     - Set a flag indicating if valid certificates are required when
       contacting the |mms| host. Default value is ``true``.
     -

   * - ``--sslTrustedMMSBackupServerCertificate``
     - Optional
     - Provide the absolute path to the trusted |certauth| certificates
       in |pem| format for the |mms| host. If this flag is not
       provided, the system |certauth| is used.
  
       .. only:: onprem
      
          If |mms| is using a self-signed |ssl| certificate, this
          setting is required.
     -

   * - ``--httpProxy``
     - Optional
     - Provide the |url| of an |http| proxy server the tool can use.
     -
