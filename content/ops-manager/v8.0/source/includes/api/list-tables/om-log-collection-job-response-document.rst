.. list-table::
   :widths: 30 14 56
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``id``
     - string
     - Unique 24-hexadecimal digit string that identifies this
       job.

   * - ``status``
     - string
     - Status of the job. Returns one of the following values:

       - ``SUCCESS``
       - ``FAILURE``
       - ``IN_PROGRESS``
       - ``MARKED_FOR_EXPIRY``
       - ``EXPIRED``

   * - ``creationDate``
     - string
     - Timestamp, in ISO 8601 UTC format, when |mms| created the
       job.

   * - ``expirationDate``
     - string
     - Timestamp, in ISO 8601 UTC format, when the job expires
       and |mms| automatically deletes its data.

   * - ``finishDate``
     - string
     - Timestamp, in ISO 8601 UTC format, when the job finished.
       ``null`` while the job is in progress.

   * - ``servers``
     - array of strings
     - List of ``serverId`` values included in this request. Returned
       by :ref:`api-om-log-collections-list-servers`.

   * - ``logTypes``
     - array of strings
     - Log types included in this request. Returns one or more of the
       following values:

       - ``APPLICATION``
       - ``HTTP_ACCESS``
       - ``MIGRATION``

   * - ``sizeRequestedPerFileBytes``
     - number
     - Maximum requested size, in bytes, per log type per server.

   * - ``logCollectionFromDate``
     - string
     - Start of the time range filter, in ISO 8601 UTC format.
       ``null`` if the request did not specify a time range.

   * - ``logCollectionToDate``
     - string
     - End of the time range filter, in ISO 8601 UTC format.
       ``null`` if the request did not specify a time range.

   * - ``uncompressedSizeTotalBytes``
     - number
     - Total uncompressed size, in bytes, of the collected log
       data.

   * - ``sizeLimitHit``
     - boolean
     - Flag that indicates whether |mms| truncated any child
       job's collected data because the data reached
       ``sizeRequestedPerFileBytes``.

   * - ``downloadUrl``
     - string
     - URL from which you can download the archive. See
       :ref:`api-om-log-collections-download-job`.

   * - ``childJobs``
     - array
     - List of child jobs associated with this request. |mms|
       includes this field only when you set ``verbose=true``.
