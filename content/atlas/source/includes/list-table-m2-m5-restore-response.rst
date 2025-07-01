.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``clusterName``
     - string
     - Name of the source |service| cluster.

   * - ``deliveryType``
     - string
     - Type of restore job to create. Possible values are:

       .. include:: /includes/api/list-tables/m2-m5-restore-download-subtable.rst

   * - ``expirationDate``
     - date
     - |iso8601-time| when the download link expires.

   * - ``id``
     - objectId
     - Unique identifier of the restore job.

   * - ``projectId``
     - objectId
     - Unique identifier of the |service| project from which the
       restore job originated.

   * - ``restoreFinishedDate``
     - date
     - |iso8601-time| when |service| marked the restore
       job as ``COMPLETED``.

   * - ``restoreScheduledDate``
     - date
     - |iso8601-time| when the restore was requested.

   * - ``snapshotFinishedDate``
     - date
     - |iso8601-time| when the snapshot associated with ``snapshotId``
       was marked as ``COMPLETED``.

   * - ``snapshotId``
     - string
     - Unique identifier of the source snapshot ID of the restore job.

   * - ``snapshotUrl``
     - string
     - |url| for the compressed snapshot files for manual download.
       Only visible if ``deliveryType`` is ``DOWNLOAD``.

   * - ``status``
     - string
     - Current status of the restore job. Possible values are:

       .. include:: /includes/fact-m2-m5-status-list.rst

   * - ``targetDeploymentItemName``
     - string
     - Name of the target |service| project of the restore job.

   * - ``targetProjectId``
     - string
     - Unique identifier of the |service| project to which the restore
       job restores the snapshot.

   
