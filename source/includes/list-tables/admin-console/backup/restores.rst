.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 80

   * - Column
     - Purpose

   * - Project
     - Project from which this snapshot was restored.

   * - Replica Set
     - Cluster of which this snapshot was restored.

   * - App User
     - |mms| user account that requested the restore.

   * - Cancelled / Broken
     - Indicator that the restore was interrupted.

   * - Point in Time
     - Date and time to which the data should be restored and the
       method used to determine that timestamp. |onprem| expresses this
       timestamp as ``mm/dd/yyyy - hh:mm:ss AM|PM``.

   * - Uncompressed Size
     - Total file size of your snapshot.

   * - Estimated Transfer Size
     - Estimated file size for the compressed file (``*.tar.gz``) to be
       transferred via |http|.

   * - Machine (tries)
     - List of Backup Daemons used for the restore as well as

       - their head DB paths
       - the number of times a Backup Daemon tried if the restore
         requires a Backup Daemon

       .. admonition:: Legacy Value
          :class: important

          No current restore delivery method retries a restore if it
          fails. This column applies to obsolete restore methods.

   * - Bytes Transferred
     - Total number of bytes that transferred while the restore job was
       valid.

   * - Last Heartbeat
     - Last date and time activity was detected on the transfer.
       |onprem| expresses this timestamp as ``mm/dd/yyyy - hh:mm:ss
       AM|PM``.

   * - Transfer Started
     - Date and time when the |http| transfer was started. |onprem|
       expresses this timestamp as ``mm/dd/yyyy - hh:mm:ss AM|PM``.

   * - Transfer Finished
     - Date and time when the |http| transfer was finished. |onprem|
       expresses this timestamp as ``mm/dd/yyyy - hh:mm:ss AM|PM``.

   * - Transfer Status
     - Status of the download when the :guilabel:`Admin` page loads.

   * - Transfer Rate
     - Speed of the |http| download in MBps.

   * - Delivery
     - Information regarding type of delivery. Types include:

       .. list-table::
          :widths: 40 60
          :header-rows: 1
          :stub-columns: 1

          * - Delivery Type
            - Restore Type

          * - ``pull``
            - Typical snapshot download

          * - ``query``
            - Queryable snapshot download

          * - ``client_pit_pull``
            - Point-in-time snapshot download

   * - Request Origin
     - Unique identifier of the project that requested the restore and
       which method was used to make the request. The method is either
       API (``automationApi``) or the Console (``automationUi``).

   * - Submitted
     - Date and time when the restore was requested. |onprem|
       expresses this timestamp as ``mm/dd/yyyy - hh:mm:ss AM|PM``.

   * - Current Phase
     - Indicator of the progress of the restore. Phases include:

       - ``transfer``
       - ``inProgress``
       - ``done``
       - ``completed``
