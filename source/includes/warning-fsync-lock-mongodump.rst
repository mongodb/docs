.. versionchanged:: 2.2 

   When used in combination with :dbcommand:`fsync` or
   :method:`db.fsyncLock()`, :program:`mongod` may block some
   reads, including those from :program:`mongodump`, when
   queued write operation waits behind the :dbcommand:`fsync`
   lock.
