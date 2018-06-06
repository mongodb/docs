When :setting:`~param.logLevel` is set to ``0``, MongoDB 
records *slow* operations to the diagnostic log at a rate determined by
:setting:`~operationProfiling.slowOpSampleRate`. At higher
:setting:`~param.logLevel` settings, all operations appear in the diagnostic
log regardless of their latency.
