Once upgraded to WiredTiger, your WiredTiger deployment is **not**
subject to the following MMAPv1-only restrictions:

.. list-table::
   :header-rows: 1

   * - MMAPv1 Restrictions
     - Short Description

   * - Number of Namespaces

     - For MMAPv1, the number of namespaces is limited to the size of
       the namespace file divided by 628.

   * - Size of Namespace File

     - For MMAPv1, namespace files can be no larger than 2047 megabytes.

   * - Database Size

     - The MMAPv1 storage engine limits each database to no more than
       16000 data files.

   * - Data Size

     - For MMAPv1, a single :binary:`~bin.mongod` instance cannot
       manage a data set that exceeds maximum virtual memory address
       space provided by the underlying operating system.

   * - Number of Collections in a Database

     - For the MMAPv1 storage engine, the maximum number of collections
       in a database is a function of the size of the namespace file
       and the number of indexes of collections in the database.
