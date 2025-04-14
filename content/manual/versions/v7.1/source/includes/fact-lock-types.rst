.. list-table::
   :widths: 20 80
   :header-rows: 1
   
   * - Lock Type

     - Description

   * - ``ParallelBatchWriterMode``

     - Represents a lock for parallel batch writer mode.

       In earlier versions, PBWM information was reported as part of
       the ``Global`` lock information.
     
       .. versionadded:: 4.2

   * - ``ReplicationStateTransition``

     - Represents lock taken for :doc:`replica set member state
       </reference/replica-states>` transitions.

       .. versionadded:: 4.2
      
   * - ``Global``

     - Represents global lock.

   * - ``Database``

     - Represents database lock.

   * - ``Collection``

     - Represents collection lock.

   * - ``Mutex``

     - Represents mutex.

   * - ``Metadata``

     - Represents metadata lock.
  
   * - ``DDLDatabase``

     - Represents a :term:`DDL <DDL (Data Definition Language)>` database lock.

       .. versionadded:: 7.1

   * - ``DDLCollection``
    
     - Represents a :term:`DDL <DDL (Data Definition Language)>` collection 
       lock.

       .. versionadded:: 7.1 

   * - ``oplog``
     - Represents lock on the :term:`oplog`.