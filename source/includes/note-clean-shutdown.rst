.. note::

   If you do not perform a clean shut down, errors result that
   prevent the :binary:`~bin.mongod` process from starting.

   Invoking ``sudo service mongod stop`` does not guarantee a 
   clean shutdown. This ``service`` script forceably stops the
   :binary:`~bin.mongod` process if it takes longer than five
   minutes to shut down.
