.. COMMENT: When included as part of options/settings, this is used by mongod and configuration file and not mongos. For mongos, see options-mongos.yaml.  This file is however included in other files where distinction between mongod/mongos is sufficient.

When :setting:`~param.logLevel` is set to ``0``, MongoDB records *slow*
operations to the diagnostic log at a rate determined by
:setting:`~operationProfiling.slowOpSampleRate`. Starting in MongoDB
4.2, the secondaries of replica sets log :ref:`all oplog entry messages
that take longer than the slow operation threshold to apply
<slow-oplog>` regardless of the sample rate.

At higher :setting:`~param.logLevel` settings, all operations appear in
the diagnostic log regardless of their latency with the following
exception: the logging of :ref:`slow oplog entry messages by the
secondaries <slow-oplog>`. The secondaries log only the slow oplog
entries; increasing the :setting:`~param.logLevel` does not log all
oplog entries.
 