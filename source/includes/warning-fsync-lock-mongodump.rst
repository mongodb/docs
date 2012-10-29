.. warning:: 

   .. vesionchanged:: 2.2 

   Before version 2.2, mhen used in combination with :dbcommand:`fsync` or
   :method:`db.fsyncLock()`, can :program:`mongod` may block some
   reads, including those from :program:`mongodump`, if there is a
   queued write operation waiting behind the :dbcomand:`fsync` lock.
