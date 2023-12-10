.. setting:: mms.backup.minimumOplogWindowHours

   *Type*: float

   *Default*: 3

   
   This sets the minimum number of hours of database operations that the
   oplog should record.
   
   Your deployment's oplog needs to be large enough to hold recovery
   data since the last snapshot. Increase this value to have |onprem|
   monitor the oplog capacity. You should set this value to meet or
   exceed the value in :setting:`brs.snapshotSchedule.interval`.
   
   If you set the value to less than :setting:`brs.snapshotSchedule.interval`, you may have a
   gap between the last snapshot and the end of the oplog. This makes
   the backup unusuable for restores. Stale backup jobs must be
   resynchronized before it can be used for restores.

