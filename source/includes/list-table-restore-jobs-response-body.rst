.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``cancelled``
     - boolean
     - Indicates whether the restore job was canceled.

   * - ``createdAt``
     - Date
     - :abbr:`UTC (Coordinated Universal Time)` 
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ formatted
       point in time when |service| created the restore job.

   * - ``deliveryType``
     - string
     - Type of restore job to create. Possible values are:

       ``automated``
         |service| automatically restores the snapshot with
         ``snapshotId`` to the |service| cluster with name
         ``targetClusterName`` in the |service| project with 
         ``targetGroupId``.

       ``download``
         |service| provides a URL to download a ``.tar.gz`` of the
         snapshot with ``snapshotId``. The contents of the ``tar.gz``
         archive contain the data files for your |service| cluster. 
         To learn more about manually restoring the downloaded data 
         files, see :ref:`restore-cloud-provider-snapshot-download`.

       ``pointInTime``
         Perform a :ref:`Point-in-Time restore <aws-pit-restore>`.

   * - ``deliveryUrl``
     - array
     - One or more URLs for the compressed snapshot files for manual
       download. Only visible if ``deliveryType`` is ``download``.

   * - ``expired``
     - boolean
     - Indicates whether the restore job expired.

   * - ``expiresAt``
     - Date
     - :abbr:`UTC (Coordinated Universal Time)` 
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ formatted
       point in time when the restore job expires.

   * - ``finishedAt``
     - Date
     - :abbr:`UTC (Coordinated Universal Time)` 
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ formatted
       point in time when the restore job completed.

   * - ``id``
     - ObjectId
     - The unique identifier of the restore job.

   * - ``links``
     - array
     - One or more links to sub-resources and/or related resources.
       The relations between URLs are explained in the `Web Linking
       Specification <http://tools.ietf.org/html/rfc5988>`_.

   * - ``oplogTs``
     - timestamp
     - If you performed a :ref:`Point-in-Time restores <aws-pit-restore>` at
       a time specified by a timestamp from the :ref:`oplog
       <ref-atlas-oplog>`, ``oplogTs`` indicates the timestamp used.

   * - ``pointInTimeUTCSeconds``
     - integer
     - If you performed a :ref:`Point-in-Time restores <aws-pit-restore>` at
       a time specified by a Unix time in seconds since epoch,
       ``pointInTimeUTCSeconds`` indicates the Unix time used.

   * - ``snapshotId``
     - string
     - Unique identifier of the source snapshot ID of the restore job.

   * - ``targetGroupId``
     - string
     - Name of the target |service| project of the restore job. Only
       visible if ``deliveryType`` is ``automated``.

   * - ``targetClusterName``
     - string
     - Name of the target |service| cluster to which the restore
       job restores the snapshot. Only visible if ``deliveryType``
       is ``automated``.

   * - ``timestamp``
     - string
     - |iso8601-time| when the snapshot associated to ``snapshotId``
       was taken.
