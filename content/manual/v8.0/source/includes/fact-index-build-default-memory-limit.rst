:dbcommand:`createIndexes` supports building one or more indexes on a collection.
:dbcommand:`createIndexes` uses a combination of memory and temporary files on disk to 
build indexes. The default memory limit is 200 megabytes per :dbcommand:`createIndexes` 
command, shared equally among all indexes built in that command. For example, if you 
build 10 indexes with one :dbcommand:`createIndexes` command, MongoDB allocates each index 
20 megabytes for the index build process when using the default memory limit of 200. 
When you reach the memory limit, MongoDB creates temporary files in the ``_tmp`` subdirectory 
within :option:`--dbpath <mongod --dbpath>` to complete the build.

You can adjust the memory limit with the :parameter:`maxIndexBuildMemoryUsageMegabytes` parameter. 
Setting a higher memory limit may result in faster completion of index
builds. However, setting this limit too high relative to the unused RAM
on your system can result in memory exhaustion and server shutdown.

Each :dbcommand:`createIndexes` command has a limit of :parameter:`maxIndexBuildMemoryUsageMegabytes`.
When using the default :parameter:`maxNumActiveUserIndexBuilds` of 3, the 
total memory usage for all concurrent index builds can reach up 
to 3 times the value of :parameter:`maxIndexBuildMemoryUsageMegabytes`.