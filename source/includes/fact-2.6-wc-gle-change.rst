.. versionchanged:: 2.6

   A new protocol for :ref:`write operations
   <rel-notes-write-operations>` integrates write concerns with the
   write operations, eliminating the need for a separate
   |gle|. Write methods now return the
   status of the write operation, including error information.

   In previous versions, clients typically used the |gle| in
   combination with the write operations to ensure that the write
   succeeds.
