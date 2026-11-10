:dbcommand:`createIndexes` supports building one or more indexes on a
collection. :dbcommand:`createIndexes` uses a combination of memory and
temporary files on disk to complete index builds. The default limit on
memory usage for :dbcommand:`createIndexes` is 200 megabytes,
shared between all indexes built using a single
:dbcommand:`createIndexes` command. Once the memory limit is reached,
:dbcommand:`createIndexes` uses temporary disk files in a subdirectory
named ``_tmp`` within the :option:`--dbpath <mongod --dbpath>`
directory to complete the build.

You can override the memory limit by setting the
:parameter:`maxIndexBuildMemoryUsageMegabytes` server parameter.
Setting a higher memory limit may result in faster completion of index
builds. However, setting this limit too high relative to the unused RAM
on your system can result in memory exhaustion and server shutdown.
