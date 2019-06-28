Starting in version 4.0.13, if a replica set member uses the
:doc:`in-memory storage engine </core/inmemory>` (voting or non-voting)
but the replica set has :rsconf:`writeConcernMajorityJournalDefault`
set to true, the replica set member logs a startup warning.
