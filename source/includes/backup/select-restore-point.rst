.. list-table::
   :widths: 20 50 30
   :header-rows: 1

   * - Restore Type

     - Description

     - Action

   * - :guilabel:`Snapshot`

     - Allows you to choose one :term:`stored snapshot <snapshot>`.

     - Select an existing :term:`snapshot <snapshot>` to restore.

   * - :guilabel:`Point In Time`

     - Creates a custom snapshot that includes all operations up to but
       not including the selected time. By default, the Oplog Store
       stores 24 hours of data.

       .. example::

          If you select ``12:00``, the last operation in the restore is
          ``11:59:59`` or earlier.

          .. important::

             In FCV 4.0, you cannot perform a :abbr:`PIT (Point in Time)` restore
             that covers any time prior to the latest backup resync. For the
             conditions that cause a resync, see
             :doc:`/tutorial/resync-backup`. This note does not apply to FCV 4.2
             or later.

     - Select a :guilabel:`Date` and :guilabel:`Time`.

   * - :guilabel:`Oplog Timestamp`

     - Creates a custom snapshot that includes all operations up to and
       including the entered Oplog timestamp. The Oplog Timestamp contains two fields:

       .. list-table::
          :widths: 30 70

          * - :guilabel:`Timestamp`
            - |epoch-time|

          * - :guilabel:`Increment`
            - Order of operation applied in that second as a
              32-bit ordinal.

     - Type an Oplog :guilabel:`Timestamp` and :guilabel:`Increment`.

       Run a query against :data:`local.oplog.rs` on your
       :term:`replica set` to find the desired timestamp.
