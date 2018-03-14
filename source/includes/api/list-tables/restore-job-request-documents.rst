.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - delivery
     - object
     - Method and details of how the restored :term:`snapshot` data
       is delivered.

   * - delivery.expires
     - timestamp
     - Date after which the :abbr:`URL (Uniform Resource Locator)` is 
       no longer available.

       Only present if ``"delivery.methodName" : "HTTP"``.

   * - delivery.expirationHours
     - number
     - Number of hours the download :abbr:`URL (Uniform Resource
       Locator)` is valid once the restore job is complete.

       Only needed if ``"delivery.methodName" : "HTTP"``.

   * - delivery.maxDownloads
     - number
     - Number of times the download :abbr:`URL (Uniform Resource
       Locator)` can be used. This must be ``1`` or greater.

       Only needed if ``"delivery.methodName" : "HTTP"``.

   * - delivery.methodName
     - string
     - Means by which the data is delivered. Accepted values are:

       - ``AUTOMATED_RESTORE``
       - ``HTTP``
       - ``QUERY``

       .. note::

          If you specify ``AUTOMATED_RESTORE`` in the request , the
          response shows the ``delivery.methodName`` as ``HTTP``. An
          automated restore uses the ``HTTP`` method to deliver the
          restore job to the target host.

       .. include:: /includes/note-scp-removed.rst

   * - delivery.targetClusterId
     - string
     - Unique identifier of the destination cluster to perform the
       restore job. 
       
       Only required if ``delivery.methodName" : "AUTOMATED_RESTORE"``.
       
   * - delivery.targetGroupId
     - string
     - Unique identifier of the project that contains the destination 
       cluster for the restore job.

       Only required if ``delivery.methodName" : "AUTOMATED_RESTORE"``.

   * - delivery.url
     - string
     - The :abbr:`URL (Uniform Resource Locator)` from which the
       restored snapshot data can be downloaded.

       Only needed if ``"delivery.methodName" : "HTTP"``.

   * - snapshotId
     - string
     - Unique identifier of the :term:`snapshot` to restore.

