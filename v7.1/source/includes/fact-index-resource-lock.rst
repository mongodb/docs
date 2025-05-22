
MongoDB uses an optimized build process that obtains and holds an exclusive 
lock on the specified collection at the start and end of the index build. All
subsequent operations on the collection must wait until |method| releases
the exclusive lock. |method| allows interleaving read and write
operations during the majority of the index build.

For more information on the locking behavior of |method|, see
:ref:`index-operations`.

