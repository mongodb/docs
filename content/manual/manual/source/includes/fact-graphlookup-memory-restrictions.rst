If the :pipeline:`$graphLookup` stage consumes more than 100 megabytes of 
memory, it automatically writes temporary files to disk. You can see when 
:pipeline:`$graphLookup` uses disk through the :dbcommand:`serverStatus`
command and view an explanation of :pipeline:`$graphLookup` disk usage 
through the :method:`~db.collection.explain()` command in :ref:`executionStats` verbosity mode. 

If the :pipeline:`$graphLookup` stage exceeds 100 megabytes of memory and the 
``allowDiskUse`` option is set to ``false``, :pipeline:`$graphLookup` returns an error.
