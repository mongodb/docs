.. note::

   If you do not perform a clean shut down, errors may result that
   prevent the :binary:`~bin.mongod` process from starting.

   Forcibly terminating the :binary:`~bin.mongod` process may cause 
   inaccurate results for :method:`db.collection.count()` and 
   :method:`db.stats()`. It may also lengthen startup time the next time 
   that the :binary:`~bin.mongod` process is restarted.

   This applies whether you attempt to terminate the
   :binary:`~bin.mongod` process from the command line via ``kill`` or
   similar, or whether you use your platform's initialization system to
   issue a ``stop`` command, like ``sudo systemctl stop mongod`` or
   ``sudo service mongod stop``.