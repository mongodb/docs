.. list-table::
   :widths: 20 80
   :header-rows: 1
   
   * - Lock Type

     - Description

   * - ``Global``

     - Represents global lock.

   * - ``MMAPV1Journal``

     - Represents MMAPv1 storage engine specific lock to synchronize
       journal writes; for non-MMAPv1 storage engines, the mode for
       ``MMAPV1Journal`` is empty.

   * - ``Database``

     - Represents database lock.

   * - ``Collection``

     - Represents collection lock.

   * - ``Metadata``

     - Represents metadata lock.

   * - ``oplog``
     - Represents lock on the :term:`oplog`.
