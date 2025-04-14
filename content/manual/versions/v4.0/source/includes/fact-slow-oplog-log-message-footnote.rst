Starting in version 4.0.6, secondary members of a replica set now
:ref:`log oplog entries <slow-oplog>` that take longer than the slow
operation threshold to apply. These slow oplog messages are logged for
the secondaries in the :option:`diagnostic log <mongod --logpath>`
under the :data:`REPL` component with the text ``applied op: <oplog
entry> took <num>ms``. These slow oplog entries depend only on the slow
operation threshold. They do not depend on the log levels (either at
the system or component level), or the profiling level, or the slow
operation sample rate. The profiler does not capture slow oplog
entries. For more information, see :ref:`slow-oplog`.
