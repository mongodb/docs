.. note::

   If you do not perform a clean shut down, errors may result that
   prevent the :binary:`~bin.mongod` process from starting.

   Forcibly terminating the :binary:`~bin.mongod` process may cause 
   inaccurate results for :method:`db.collection.count()` and 
   :method:`db.stats()` as well as lengthen startup time the next time 
   that the :binary:`~bin.mongod` process is restarted.

   Invoking ``sudo service mongod stop`` does not guarantee a 
   clean shutdown. This ``service`` script forceably stops the
   :binary:`~bin.mongod` process if it takes longer than five
   minutes to shut down.
