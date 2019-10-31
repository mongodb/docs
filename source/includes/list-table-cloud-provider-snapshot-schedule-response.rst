.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``clusterId``
     - string
     - Unique identifier of the |service| cluster.

   * - ``clusterName``
     - string
     - Name of the |service| cluster.

   * - ``links``
     - array
     - .. include:: /includes/api/links-explanation.rst

   * - ``nextSnapshot``
     - string
     - |utc| `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_
       formatted point in time when |service| will take the next
       snapshot.

   * - ``numOfSnapshotsToRetain``
     - number
     - Number of snapshots |service| retains for the
       cluster.

   * - ``restoreWindowDays``
     - number
     - Specifies a restore window in days for the cloud provider backup
       to maintain.

   * - ``referenceHourOfDay``
     - number
     - |utc| Hour of day between ``0`` and ``23`` representing which
       hour of the day that |service| takes a snapshot.

   * - ``referenceMinuteOfHour``
     - number
     - |utc| Minute of day between ``0`` and ``59`` representing which
       minute of the ``referenceHourOfDay`` that |service| takes the
       snapshot.
