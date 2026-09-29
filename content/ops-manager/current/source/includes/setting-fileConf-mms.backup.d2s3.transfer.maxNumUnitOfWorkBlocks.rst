.. setting:: mms.backup.d2s3.transfer.maxNumUnitOfWorkBlocks

   *Type*: integer

   *Default*: 100


   This sets the maximum number of blocks per work unit for the
   Direct to S3 Backup upload path, when the {+mdbagent+} splits
   snapshot files for parallel upload to S3.

   When this property is unset, the {+mdbagent+} falls back to a
   built-in default of 100 blocks per work unit. To learn how to
   enable Direct to S3 Backup, see :ref:`om-direct-s3-backup`.


