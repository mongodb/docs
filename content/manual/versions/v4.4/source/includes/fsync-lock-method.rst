
Servers maintain an fsync lock count.  The :method:`~db.fsyncLock` method
increments the lock count while the :method:`~db.fsyncUnlock` method decrements
it. To unlock writes on a server or cluster, call the :method:`~db.fsyncUnlock`
method until the lock count reaches zero.
   
