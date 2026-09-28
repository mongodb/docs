
.. list-table::
   :header-rows: 1
   :widths: 45 15 60

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

   * - ``performStrictChunkChecksIfBelowThreshold``
     - integer
     
     - .. versionadded:: 9.0

       Optional. Chunk-count threshold that determines how
       thoroughly the command compares a shard's chunk metadata
       for the checked collection.

       The default value is ``1152921504606846975`` (2\ :sup:`60` - 1)
       chunks, which means that by default, the command always performs
       the strict check with full comparison.

       For more information, see
       :ref:`checkMetadataConsistency-chunk-check-threshold`.
