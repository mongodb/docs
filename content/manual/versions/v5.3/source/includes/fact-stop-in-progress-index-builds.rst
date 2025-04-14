Starting in MongoDB 4.4, if an index specified to |drop-index| is still 
building, |drop-index| attempts to stop the in-progress build. Stopping 
an index build has the same effect as dropping the built index. In 
versions earlier than MongoDB 4.4, |drop-index| returns an error if 
there are any index builds in progress on the collection.

For replica sets, run |drop-index| on the :term:`primary`. 
The primary stops the index build and creates an associated 
"abortIndexBuild" :term:`oplog` entry. Secondaries which replicate
the "abortIndexBuild" oplog entry stop the in-progress index build and
discard the build job. See :ref:`index-build-process` for detailed
documentation on the index build process.

Use :dbcommand:`currentOp` to identify the index builds associated with 
a :dbcommand:`createIndexes` or :method:`db.collection.createIndexes()`
operation. See :ref:`currentOp-cmd-index-creation` for an example.
