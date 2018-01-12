The system log and profiler are configured separately but share the same
settings for ``slowms`` and ``sampleRate``.
When :setting:`~param.logLevel` is set to ``0``, :binary:`~bin.mongod`
records *slow* queries to the system log at a rate determined by
:setting:`~operationProfiling.slowOpSampleRate`. At higher
:setting:`~param.logLevel` settings, all queries appear in the system
log regardless of their latency.
