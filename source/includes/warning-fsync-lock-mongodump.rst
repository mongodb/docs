.. versionchanged:: 2.2

   When used in combination with :dbcommand:`fsync` or
   :method:`db.fsyncLock()`, :program:`mongod` will block
   reads, including those from :program:`mongodump`, when
   queued write operation waits behind the :dbcommand:`fsync`
   lock. Do not use :program:`mongodump` with
   :method:`db.fsyncLock()`.
