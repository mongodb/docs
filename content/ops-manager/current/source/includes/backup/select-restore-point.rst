.. list-table::
   :widths: 20 50 30
   :header-rows: 1

   * - Restore Type

     - Description

     - Action

   * - :guilabel:`Snapshot`

     - Allows you to choose one :manual:`stored snapshot </reference/glossary/#std-term-snapshot>`.

     - Select an existing :manual:`snapshot </reference/glossary/#std-term-snapshot>` to restore.

   * - :guilabel:`Point In Time`

     - Creates a custom snapshot that includes all operations up to but
       not including the selected time. By default, the Oplog Store
       stores 24 hours of data.

       .. include:: /includes/fact-restore-doesnt-include-selected-time.rst

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

       Run a query against ``local.oplog.rs`` on your
       :manual:`replica set </reference/glossary/#std-term-replica-set>` to find the desired timestamp.
