.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``id``
     - string
     - Unique identifier of the log collection request job.

   * - ``groupId``
     - string
     - Unique identifier of the :term:`project` that the log
       collection request is associated with.

   * - ``userId``
     - string
     - Unique identifier of the user executing the request.

   * - ``creationDate``
     - string
     - |Epoch-time| when the log collection request job was
       created.

   * - ``expirationDate``
     - string
     - |Epoch-time| when the log collection request job expires.

   * - ``status``
     - string
     - Status of the log collection request job. One of the
       following values:

       - ``SUCCESS``
       - ``FAILURE``
       - ``IN_PROGRESS``
       - ``MARKED_FOR_EXPIRY``
       - ``EXPIRED``

   * - ``resourceType``
     - string
     - Type of resource for which logs were requested. One
       of the following values:

       - ``CLUSTER``
       - ``PROCESS``
       - ``REPLICASET``

   * - ``resourceName``
     - string
     - Name of the resource for which logs were requested.

   * - ``rootResourceName``
     - string
     - If the request is made to a part of a deployment, such as one
       replica set in a cluster, this is the name of the *complete*
       deployment.

   * - ``rootResourceType``
     - string
     - If the request is made to a part of a deployment, such as one
       replica set in a cluster, this is the type of the *complete*
       deployment. One of the following values:

       - ``CLUSTER``
       - ``PROCESS``
       - ``REPLICASET``

   * - ``downloadUrl``
     - string
     - URL to download the logs from this request.

   * - ``redacted``
     - boolean
     - If ``true``, emails, hostnames, IP addresses, and namespaces
       in the response are replaced with random string values.

   * - ``logTypes``
     - array
     - Array of the log type included in this request. Will contain
       one of the following values:

       - ``AUTOMATION_AGENT``
       - ``BACKUP_AGENT``
       - ``MONITORING_AGENT``
       - ``MONGODB``
       - ``FTDC``

   * - ``sizeRequestedPerFileBytes``
     - number
     - Size for each log file in bytes.

   * - ``uncompressedSizeTotalBytes``
     - number
     - Total uncompressed size of the log data returned by this
       request in bytes.

   * - ``childJobs``
     - array
     - Array of child jobs associated with this request. Included
       in the response if the request includes ``--verbose true``.

   * - | ``childJobs[n]``
       | ``.automationAgentId``
     - number
     - Unique identifier of this child job.

   * - | ``childJobs[n]``
       | ``.errorMessage``
     - string
     - Error message showing why this child job failed. Omitted if the 
       child job is successful.

   * - | ``childJobs[n]``
       | ``.startDate``
     - date
     - |iso8601-time| when this child job started.

   * - | ``childJobs[n]``
       | ``.finishDate``
     - date
     - |iso8601-time| when this child job finished.

   * - | ``childJobs[n]``
       | ``.hostName``
     - string
     - Name of the host from whom the child job collects the logs.

   * - | ``childJobs[n]``
       | ``.logCollectionType``
     - string
     - The type of log this child job collects. Returns one of the
       following values:

       - ``AUTOMATION_AGENT``
       - ``BACKUP_AGENT``
       - ``MONITORING_AGENT``
       - ``MONGODB``
       - ``FTDC``

   * - | ``childJobs[n]``
       | ``.path``
     - string
     - Path to the process in the deployment for which this child
       job collects logs.

   * - | ``childJobs[n]``
       | ``.status``
     - string
     - Status of this child job. Returns one of the following
       values:

       - ``SUCCESS``
       - ``FAILURE``
       - ``IN_PROGRESS``
       - ``MARKED_FOR_EXPIRY``
       - ``EXPIRED``

   * - | ``childJobs[n]``
       | ``.uncompressedDiskSpaceBytes``
     - number
     - Total uncompressed disk space in bytes used by this child job.
