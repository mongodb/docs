You can build one or more indexes on a collection with the database
command :dbcommand:`createIndexes`. The default limit on memory usage
for a :dbcommand:`createIndexes` operation is
500 megabytes. You can override this limit by setting the
:parameter:`maxIndexBuildMemoryUsageMegabytes` server parameter.

:dbcommand:`createIndexes` uses a combination of memory and
temporary files on disk to complete index builds. Once
the memory limit is reached, :dbcommand:`createIndexes` uses
temporary disk files in a subdirectory named ``_tmp`` within the
:option:`--dbpath <mongod --dbpath>` directory for additional scratch space. The higher
the memory limit is set, the faster the index build can complete, but
be careful not to set this limit too high relative to available RAM or
your system can run out of free memory.