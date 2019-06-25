.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``finishTime``
     - date
     - |iso8601-time| when |service| marked the snapshot
       as ``COMPLETED``.

   * - ``id``
     - objectId
     - Unique identifier of the snapshot.

   * - ``mongoDBVersion``
     - string
     - Version of the MongoDB server.

   * - ``scheduledTime``
     - date
     - |iso8601-time| when the snapshot is scheduled to be
       taken.

   * - ``startTime``
     - date
     - |iso8601-time| when |service| began taking the
       snapshot.

   * - ``status``
     - string
     - Current status of the snapshot. Possible values are:

       .. include:: /includes/fact-m2-m5-status-list.rst
