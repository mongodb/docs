During live migration, the :binary:`~bin.mongos` processes on the
target cluster are shut down and cluster connectivity via the
``mongos`` servers is suspended. The ``mongos`` processes restart
automatically once the migration is complete.