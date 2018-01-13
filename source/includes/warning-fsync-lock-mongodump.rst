.. versionchanged:: 2.2

   When used in combination with :dbcommand:`fsync` or
   :method:`db.fsyncLock()`, :binary:`~bin.mongod` will block
   reads, including those from :binary:`~bin.mongodump`, when
   queued write operation waits behind the :dbcommand:`fsync`
   lock. Do not use :binary:`~bin.mongodump` with
   :method:`db.fsyncLock()`.
