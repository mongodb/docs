.. option:: --oplogPath <path>

   
   *New in version 0.5.0*
   
   Enables :program:`mongomirror` to buffer the initial sync oplog window to disk.
   When you specify a value for this option, :program:`mongomirror` streams the
   source oplog entries to the specified directory in a single
   file: ``<oplogPath>/oplog-mongomirror.bson.sz``. After the entire
   oplog file is replayed to the destination cluster, :program:`mongomirror`
   removes the file and starts tailing the source oplog without
   buffering.
   
   By default, :program:`mongomirror` streams oplog entries from the source
   and applies them to the destination cluster. However, the
   migration may fail if the source oplog is not large enough to
   contain the entire initial sync oplog window. To avoid this
   error, you can either :manual:`increase the size of the source oplog
   </tutorial/change-oplog-size>`, or specify this option to ensure
   that the source oplog will not run out of space during the migration
   process.
   
   .. important::
   
      There must be enough disk space to accommodate all of the source
      oplog entries that occur during the initial :program:`mongomirror` sync.
   
      .. example::
   
         If the source oplog is 10 GB and covers 24 hours of changes,
         and :program:`mongomirror`'s sync is estimated to take 48 hours, there
         must be at least 20 GB of free disk space in the specified
         directory.

