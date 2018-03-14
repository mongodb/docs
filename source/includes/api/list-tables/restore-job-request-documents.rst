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

   * - delivery.expirationHours
     - number
     - Number of hours the download :abbr:`URL (Uniform Resource
       Locator)` is valid once the restore job is complete.

       Only needed if ``"delivery.methodName" : "HTTP"``.

   * - delivery.formatName
     - string
     - Format in which data from an :abbr:`SCP (secure copy)` restore
       should be written to the destination. Accepted values are:

       - ``ARCHIVE``
       - ``INDIVIDUAL``

       Only needed if ``"delivery.methodName" : "SCP"``.

   * - delivery.hostname
     - string
     - Hostname of the server to which the data should be written
       for an :abbr:`SCP (secure copy)` restore.

       Only needed if ``"delivery.methodName" : "SCP"``.

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
       - ``SCP``

       .. note::

          If you specify ``AUTOMATED_RESTORE`` in the request , the
          response shows the ``delivery.methodName`` as ``HTTP``. An
          automated restore uses the ``HTTP`` method to deliver the
          restore job to the target host.

       .. include:: /includes/note-scp-deprecation.rst

   * - delivery.password
     - string
     - Password to use for :abbr:`SCP (secure copy)`.

       Only needed if ``"delivery.methodName" : "SCP"``.

       .. note::
          It is never exposed in a restore job response document.

   * - delivery.passwordTypeName
     - string
     - Type of authentication to use for :abbr:`SCP (secure copy)`.
       Accepted values are:

       - ``PASSWORD``
       - ``SSH_KEY``

       Only needed if ``"delivery.methodName" : "SCP"``.

   * - delivery.port
     - number
     - Port to use for ``SCP``.

       Only needed if ``"delivery.methodName" : "SCP"``.

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

   * - delivery.targetClusterId
     - string
     - Unique identifier of the destination cluster to perform the 
       restore job. 
       
       Only required if ``delivery.methodName" : "AUTOMATED_RESTORE"``.
       
   * - delivery.targetDirectory
     - string
     - Target directory to which the data should be written for an
       :abbr:`SCP (secure copy)` restore.

       Only needed if ``"delivery.methodName" : "SCP"``.

   * - delivery.targetGroupId
     - string
     - Unique identifier of the project that contains the destination 
       cluster for the restore job.

       Only required if ``delivery.methodName" : "AUTOMATED_RESTORE"``.

   * - delivery.username
     - string
     - Username to use for :abbr:`SCP (secure copy)`.

       Only needed if ``"delivery.methodName" : "SCP"``.

   * - encryptionEnabled
     - boolean
     - Flag indicating whether the restored snapshot data is encrypted.

   * - masterKeyUUID
     - string
     - :abbr:`KMIP (Key Management Interoperability Protocol)`
       :doc:`master key ID </tutorial/encrypt-snapshots>` used to
       encrypt the :term:`snapshot` data. 

       Only present only if ``"encryptionEnabled" : true``.

   * - snapshotId
     - string
     - Unique identifier of the :term:`snapshot` to restore.

