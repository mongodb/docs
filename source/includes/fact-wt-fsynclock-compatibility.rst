With WiredTiger the :method:`db.fsyncLock()` and
:method:`db.fsyncUnlock()` operations *cannot* guarantee that the data
files do not change. As a result, do not use these methods to ensure
consistency for the purposes of creating backups.
