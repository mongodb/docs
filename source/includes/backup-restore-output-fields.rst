.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - clusterId
     - string
     - Unique identifier of the cluster that the
       restore job represents.

   * - created
     - string
     - |iso8601-time| when the restore job was requested.

   * - delivery
     - object
     - Method and details of how the restored snapshot data
       is delivered.

   * - delivery.expirationHours
     - number
     - *For HTTP only.* 

       Number of hours the download |url| is valid once the restore
       job is complete.

   * - delivery.expires
     - string
     - *For HTTP only.*

       |iso8601-time| after which the |url| is no longer available.

   * - delivery.maxDownloads
     - number
     - *For HTTP only.*

       Number of times the download |url| can be used. This must be
       ``1`` or greater.

   * - delivery.methodName
     - string
     - Means by which the data is delivered. Accepted values are:

       - ``HTTP``

   * - delivery.statusName
     - string
     - Current status of the downloadable file. Accepted values are:

       - ``NOT_STARTED``
       - ``IN_PROGRESS``
       - ``READY``
       - ``FAILED``
       - ``INTERRUPTED``
       - ``EXPIRED``
       - ``MAX_DOWNLOADS_EXCEEDED``

   * - delivery.url
     - string
     - *For HTTP only.*

       |url| from which the restored snapshot data can be
       downloaded.

   * - encryptionEnabled
     - boolean
     - Flag indicating whether the restored snapshot data is
       encrypted.

   * - groupId
     - string
     - Unique identifier of the group that owns the restore 
       job.

   * - id
     - string
     - Unique identifier of the restore job.

   * - links
     - object array
     - One or more links to sub-resources and/or related resources. The
       relations between URLs are explained in the `Web Linking Specification <http://tools.ietf.org/html/rfc5988>`_.

   * - pointInTime
     - boolean
     - Flag indicating that the job is for a 
       :abbr:`PIT (point-in-time)` restore.

   * - snapshotId
     - string
     - Unique identifier of the snapshot to restore.

   * - statusName
     - string
     - Current status of the job. Accepted values are:

       - ``FINISHED``
       - ``IN_PROGRESS``
       - ``BROKEN``
       - ``KILLED``

   * - timestamp
     - object
     - Timestamp of the Oplog entry when the snapshot was created.

   * - timestamp.date
     - string
     - |iso8601-time| of the latest oplog entry in the restored
       snapshot.

   * - timestamp.increment
     - string
     - Order of all operations completed at the latest oplog entry in
       the restored snapshot.
