.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - childJobs
     - array
     - List of child jobs associated with this request. Included in the
       response if you set tthe **verbose** query parameter to
       ``true``.

   * - childJobs[n].errorMessage
     - string
     - Error message showing why this child job failed, if applicable.

   * - childJobs[n].finishDate
     - string
     - |iso8601-time| when this child job finished.

   * - childJobs[n].hostName
     - string
     - Name of the host from whom the child job collects the logs.

   * - childJobs[n].logCollectionType
     - string
     - Type of log this child job collects. Returns one of the
       following values:

       - ``AUTOMATION_AGENT``
       - ``BACKUP_AGENT``
       - ``MONITORING_AGENT``
       - ``MONGODB``
       - ``FTDC``

   * - childJobs[n].path
     - string
     - Path to the process in the deployment for which this child job
       collects logs. |service| uses these paths to build the directory
       hierarchy in the compressed archive file.

       .. list-table::
          :widths: 40 60
          :header-rows: 1
          :stub-columns: 1

          * - logCollectionType
            - Path
          * - AUTOMATION_AGENT
            - ``<hostname>/automation_agent``
          * - BACKUP_AGENT
            - ``<hostname>/automation_agent``
          * - MONITORING_AGENT
            - ``<hostname>/automation_agent``
          * - MONGODB
            - ``<hostname>/<port>/<mongodb>``
          * - FTDC
            - ``<hostname>/<port>/<ftdc>``


   * - childJobs[n].startDate
     - string
     - |iso8601-time| when this child job started.

   * - childJobs[n].status
     - string
     - Status of this child job. This resource returns one of the
       following values:

       - ``SUCCESS``
       - ``FAILURE``
       - ``IN_PROGRESS``
       - ``MARKED_FOR_EXPIRY``
       - ``EXPIRED``

   * - childJobs[n].uncompressedDiskSpaceBytes
     - number
     - Total uncompressed disk space in bytes that this child job uses.

   * - creationDate
     - string
     - |Epoch-time| when you created the log collection request job.

   * - expirationDate
     - string
     - |Epoch-time| when the log collection request job expires.

   * - groupId
     - string
     - Unique 24-hexadecimal digit string that identifies the
       :term:`project` associated with log collection request.

   * - id
     - string
     - Unique 24-hexadecimal digit string that identifies the log
       collection request job.

   * - logTypes
     - array
     - List of log types included in this request. This resource
       returns one or more of the following values:

       - ``AUTOMATION_AGENT``
       - ``BACKUP_AGENT``
       - ``MONITORING_AGENT``
       - ``MONGODB``
       - ``FTDC``

   * - redacted
     - boolean
     - Flag that indicates whether the request replaces emails,
       hostnames, IP addresses, and namespaces in the response with
       random string values.

   * - resourceName
     - string
     - Name of the resource for which you requested logs.

   * - resourceType
     - string
     - Type of resource for which you requested logs. This resource
       returns one of the following values:

       - ``CLUSTER``
       - ``PROCESS``
       - ``REPLICA_SET``

   * - rootResourceName
     - string
     - Name of the complete deployment if you made the log request to a
       part of a deployment. Part of the deployment could be a replica
       set in a cluster or one shard of a sharded cluster.

   * - rootResourceType
     - string
     - Type of the part of the complete deployment if you made the log
       request to a part of a deployment. Part of the deployment could
       be a replica set in a cluster or one shard of a sharded cluster.
       This resource returns one of the following values:

       - ``CLUSTER``
       - ``PROCESS``
       - ``REPLICA_SET``

   * - status
     - string
     - Status of the log collection request job. This resource returns
       one of the following values:

       - ``SUCCESS``
       - ``FAILURE``
       - ``IN_PROGRESS``
       - ``MARKED_FOR_EXPIRY``
       - ``EXPIRED``

   * - sizeRequestedPerFileBytes
     - number
     - Size for each log file in bytes.

   * - uncompressedSizeTotalBytes
     - number
     - Total uncompressed size of the log data in bytes that this
       request returns.

   * - userId
     - string
     - Unique 24-hexadecimal digit string that identifies the user
       executing the request.

   * - url
     - string
     - Internet address from which you download the logs from this
       request.
