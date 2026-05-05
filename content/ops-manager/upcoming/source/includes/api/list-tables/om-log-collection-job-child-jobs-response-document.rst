.. list-table::
   :widths: 35 14 51
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``childJobs[n].serverId``
     - string
     - ``serverId`` of the |mms| server from which this child job
       collects logs.

   * - ``childJobs[n].logCollectionType``
     - string
     - Log type that this child job collects. Returns one of the
       following values:

       - ``APPLICATION``
       - ``HTTP_ACCESS``
       - ``MIGRATION``

   * - ``childJobs[n].status``
     - string
     - Status of this child job. Returns one of the following
       values:

       - ``SUCCESS``
       - ``FAILURE``
       - ``IN_PROGRESS``
       - ``MARKED_FOR_EXPIRY``
       - ``EXPIRED``

   * - ``childJobs[n].startDate``
     - string
     - Timestamp, in ISO 8601 UTC format, when this child job
       started.

   * - ``childJobs[n].finishDate``
     - string
     - Timestamp, in ISO 8601 UTC format, when this child job
       finished. ``null`` while the child job is in progress.

   * - ``childJobs[n].errorMessage``
     - string
     - Error message that explains why this child job failed.
       ``null`` if the child job did not fail.

   * - ``childJobs[n].sizeLimitHit``
     - boolean
     - Flag that indicates whether |mms| truncated this child
       job's collected data because the data reached
       ``sizeRequestedPerFileBytes``.

   * - ``childJobs[n].uncompressedDiskspaceBytes``
     - number
     - Total uncompressed disk space, in bytes, that this child
       job uses.
