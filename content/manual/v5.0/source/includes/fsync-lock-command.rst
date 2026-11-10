.. important::

   Servers maintain an fsync lock count.  The :dbcommand:`fsync` command with
   the ``lock`` field set to ``true`` increments the lock count while the
   :dbcommand:`fsyncUnlock` command decrements it. To enable writes on a locked
   server or cluster, call the :dbcommand:`fsyncUnlock` command until the lock
   count reaches zero.
   
