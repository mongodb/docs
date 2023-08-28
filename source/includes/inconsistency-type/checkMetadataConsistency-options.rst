
.. list-table::
   :header-rows: 1
   :widths: 20 15 60

   * - Field
     - Type
     - Description

   * - ``checkIndexes``
     - boolean 
     - Sets whether the command also checks indexes in sharding metadata.  

       By default, this operation is disabled, because if it can return false
       positives inconsistencies when run concurrent with operations that 
       create, delete, or modify indexes.  Only check indexes at times when
       you know these operations are unlikely to occur.

   * - ``cursor``
     - document
     - Configures the return cursor.

   * - ``cursor.batchSize``
     - integer
     - Maximum number of sharding metadata inconsistency documents 
       to include in each batch.

