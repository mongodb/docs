:dbcommand:`createIndexes` supports building one or more indexes on a collection.
:dbcommand:`createIndexes` uses a combination of memory and temporary files on disk to 
build indexes. The default memory limit is 200 megabytes per :dbcommand:`createIndexes` 
command, shared equally among all indexes built in that command. For example, if you 
build 10 indexes with one :dbcommand:`createIndexes` command, MongoDB allocates each index 
20 megabytes for the index build process when using the default memory limit of 200. 
When you reach the memory limit, MongoDB creates temporary files in the ``_tmp`` subdirectory 
within :option:`--dbpath <mongod --dbpath>` to complete the build.

Adjust the memory limit with the
:parameter:`maxIndexBuildMemoryUsageMegabytes` parameter.
Increasing this parameter is only necessary in rare cases, such as when you run many
simultaneous index builds with a single :dbcommand:`createIndexes` command
or when you index a data set larger than 500GB.

Each :dbcommand:`createIndexes` command has a limit of :parameter:`maxIndexBuildMemoryUsageMegabytes`.
When using the default :parameter:`maxNumActiveUserIndexBuilds` of 3, the 
total memory usage for all concurrent index builds can reach up 
to 3 times the value of :parameter:`maxIndexBuildMemoryUsageMegabytes`.