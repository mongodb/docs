.. list-table::
   :widths: 20 40 40
   :header-rows: 1

   * - Restore Type

     - Description

     - Action

   * - :guilabel:`Snapshot`

     - Allows you to choose one :manual:`stored snapshot </reference/glossary/#std-term-snapshot>`.

     - Select an existing :manual:`snapshot </reference/glossary/#std-term-snapshot>` to restore.

   * - :guilabel:`Point In Time`

     - Creates a custom snapshot that includes all operations up to
       but not including the selected time.

       .. example::

          If you select ``12:00``, the last operation in the restore is
          ``11:59:59`` or earlier.

     - Select a :guilabel:`Date` and :guilabel:`Time`.

   * - :guilabel:`Oplog Timestamp`

     - Creates a custom snapshot based on the timestamp of an 
       :manual:`oplog </reference/glossary/#std-term-oplog>` entry (its ``ts`` field). |mms| includes all 
       operations up to *and including* the time of the timestamp.

       The oplog entry's ``ts`` field is a 
       :manual:`BSON </reference/bson-types>` timestamp and has two 
       components: the timestamp and the increment.

     -  
       Type the following:

       :guilabel:`Timestamp`
         The value in seconds since the Unix epoch.

       :guilabel:`Increment`
         An incrementing ordinal for operations within a given second.