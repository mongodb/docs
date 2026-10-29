.. setting:: mms.backup.groom.failedDeleteRetryDelayHours

   *Type*: integer

   *Default*: 24

   The number of hours that the Backup Daemon waits before it retries
   deleting an S3 object that a :term:`groom` job could not delete,
   for example because the object is still under an Object Lock
   retention period.

   If you set this value to ``0`` or less, |onprem| logs a warning
   and uses the default value.

   |onprem| never discards queued deletes. If the object store still
   rejects a delete after 30 retries, the Backup Daemon logs an error
   that names the snapshot store and the object.
