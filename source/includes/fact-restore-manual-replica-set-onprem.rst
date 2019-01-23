.. list-table::
   :widths: 30 10 60
   :header-rows: 1
 
   * - Option
     - Necessity
     - Description
 
   * - ``--https``
     - Optional
     - Use if you need :abbr:`TLS (Transport Security Layer)`/
       :abbr:`SSL (Secure Sockets Layer)` to connect to the
       ``--oplogSourceAddr``.
 
   * - ``--host``
     - Required
     - Provide the hostname, |fqdn|, |ipv4| address, or |ipv6|
       address for the host that serves the :program:`mongod` to
       which the :term:`oplog <Oplog Store Database>` should be
       applied. If you copied the
       ``mongodb-backup-restore-util`` command provided in the
       |application|, this field is pre-configured.
 
   * - ``--port``
     - Required
     - Provide the port for the host that serves the
       :program:`mongod` to which the :term:`oplog <Oplog Store
       Database>` should be applied. If you copied the
       ``mongodb-backup-restore-util`` command provided in the
       |application|, this field is pre-configured.
 
   * - ``--opStart``
     - Required
     - Provide the 
       :ref:`BSON timestamp <document-bson-type-timestamp>`
       for the first :term:`oplog <Oplog Store Database>` entry
       you want to include in the restore. If you copied the
       ``mongodb-backup-restore-util`` command provided in the
       |application|, this field is pre-configured.
 
   * - ``--opEnd``
     - Required
     - Provide the 
       :ref:`BSON timestamp <document-bson-type-timestamp>`
       for the last :term:`oplog <Oplog Store Database>` entry
       you want to include in the restore. If you copied the
       ``mongodb-backup-restore-util`` command provided in the
       |application|, this field is pre-configured.
 
   * - ``--logFile``
     - Optional
     - Provide a path, including file name, where the
       :abbr:`MBRU (MongoDB Backup Restore Utility)` log is
       written.
 
   * - ``--oplogSourceAddr``
     - Required
     - Provide the URL for the |mms| resource endpoint. If you copied 
       the ``mongodb-backup-restore-util`` command provided in the
       |application|, this field is pre-configured.
 
   * - ``--apiKey``
     - Required
     - Provide your |mms| Agent
       :doc:`API Key </tutorial/manage-agent-api-key>`. If you copied 
       the ``mongodb-backup-restore-util`` command provided in the
       |application|, this field is pre-configured.
 
   * - ``--groupId``
     - Required
     - Provide the :term:`group` ID. If you copied the
       ``mongodb-backup-restore-util`` command provided in the
       |application|, this field is pre-configured.
 
   * - ``--rsId``
     - Required
     - Provide the :term:`replica set` ID. If you copied the
       ``mongodb-backup-restore-util`` command provided in the
       |application|, this field is pre-configured.
 
   * - ``--whitelist``
     - Optional
     - Provide a list of databases and/or collections to which you
       want to limit the restore.
 
   * - ``--blacklist``
     - Optional
     - Provide a list of databases and/or collections to which you
       want to exclude from the restore.
 
   * - ``--seedReplSetMember``
     - Optional
     - Use if you need a replica set member to re-create the
       :term:`oplog <Oplog Store Database>` collection and seed
       it with the correct timestamp.
 
       Requires ``--oplogSizeMB`` and ``--seedTargetPort``.
 
   * - ``--oplogSizeMB``
     - Conditional
     - Provide the :term:`oplog <Oplog Store Database>` size 
       in MB.
 
       Required if ``--seedReplSetMember`` is set.
 
   * - ``--seedTargetPort``
     - Conditional
     - Provide the port for the :term:`replica set`'s
       :term:`primary`. This may be different from the `ephemeral
       port <https://en.wikipedia.org/wiki/Ephemeral_port?oldid=797306581>`_
       used.
 
       Required if ``--seedReplSetMember`` is set.
 
   * - ``--ssl``
     - Optional
     - Use if you need :abbr:`TLS (Transport Security Layer)` /
       :abbr:`SSL (Secure Sockets Layer)` to apply :term:`oplogs
       <Oplog Store Database>` to the :program:`mongod`.
       Requires ``--sslCAFile`` and ``--sslPEMKeyFile``.
 
   * - ``--sslCAFile``
     - Conditional
     - Provide the path to the :abbr:`CA (Certificate Authority)`
       file.
 
       Required if ``--ssl`` is set.
 
   * - ``--sslPEMKeyFile``
     - Conditional
     - Provide the path to the :abbr:`PEM (privacy-enhanced mail)`
       certificate file.
 
       Required if ``--ssl`` is set.

   * - ``--sslPEMKeyFilePwd``
     - Conditional
     - Provide the password for the :abbr:`PEM (privacy-enhanced mail)`
       certificate file specified in ``--sslPEMKeyFile``.

       Required if ``--ssl`` is set.
