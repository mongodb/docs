.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``clusterId``
     - ObjectId
     - Unique identifier of the |service| cluster.

   * - ``clusterName``
     - String
     - Name of the |service| cluster.

   * - ``links``
     - array
     - One or more links to sub-resources and/or related resources.
       The relations between URLs are explained in the `Web Linking
       Specification <http://tools.ietf.org/html/rfc5988>`_.

   * - ``nextSnapshot``
     - date
     - :abbr:`UTC (Coordinated Universal Time)` 
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ formatted
       point in time when |service| will take the next snapshot.

   * - ``numOfSnapshotsToRetain``
     - int
     - Number of snapshots |service| retains for the
       cluster.

   * - ``restoreWindowDays``
     - int
     - Specifies a restore window in days for the cloud provider backup to
       maintain.

   * - ``referenceHourOfDay``
     - int
     - :abbr:`UTC (Coordinated Universal Time)`
       Hour of day between ``0`` and ``23`` representing which hour
       of the day that |service| takes a snapshot.

   * - ``referenceMinuteOfHour``
     - int
     - :abbr:`UTC (Coordinated Universal Time)`
       Minute of day between ``0`` and ``59`` representing which minute
       of the ``referenceHourOfDay`` that |service| takes the snapshot.