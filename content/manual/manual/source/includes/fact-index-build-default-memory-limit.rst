:dbcommand:`createIndexes` supports building one or more indexes on a
collection. ``createIndexes`` uses a combination of memory and temporary
files on disk to build indexes. In self-hosted MongoDB deployments, the
default value of the :parameter:`maxIndexBuildMemoryUsageMegabytes`
parameter is 200 megabytes per ``createIndexes`` command.
``createIndexes`` shares the memory limit equally among all the indexes
it builds. For example, if you build 10 indexes with one
``createIndexes`` command, MongoDB allocates each index 20 megabytes for
the index build process. When you reach the memory limit, MongoDB
creates temporary files in the ``_tmp`` subdirectory within
:option:`--dbpath <mongod --dbpath>` to complete the build.

When using the default :parameter:`maxNumActiveUserIndexBuilds` of
``3``, the total memory usage for all concurrent index builds can reach
up to three times the value of ``maxIndexBuildMemoryUsageMegabytes``.

In self-hosted MongoDB deployments, you can change the memory limit for
index builds by setting the ``maxIndexBuildMemoryUsageMegabytes``
parameter. Increasing this parameter is only necessary in rare cases.
Such cases include running many simultaneous index builds with a single
``createIndexes`` command or indexing a data set larger than 500GB. You
can also set ``maxNumActiveUserIndexBuilds`` to adjust how many index
builds can run concurrently.

On {+atlas+}, the default values of
``maxIndexBuildMemoryUsageMegabytes`` and
``maxNumActiveUserIndexBuilds`` vary by cluster tier. You cannot modify
``maxIndexBuildMemoryUsageMegabytes`` on {+atlas+}.
