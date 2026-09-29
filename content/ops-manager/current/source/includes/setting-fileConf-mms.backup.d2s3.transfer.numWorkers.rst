.. setting:: mms.backup.d2s3.transfer.numWorkers

   *Type*: integer

   *Default*: 2


   This sets the number of parallel upload workers that the
   {+mdbagent+} uses when uploading snapshot blocks directly to S3
   with Direct to S3 Backup. |onprem| passes this value to the
   {+mdbagent+} with each backup; the {+mdbagent+} does not read it
   from its own local configuration.

   If you set this property, the {+mdbagent+} uses that exact number
   of workers and skips its own auto-tuning. If you leave it unset,
   the {+mdbagent+} sizes the worker count based on the host's CPU
   and memory. You can also override this value per backup job. To
   learn how to enable Direct to S3 Backup, see
   :ref:`om-direct-s3-backup`.


