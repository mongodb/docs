MongoDB allows clients to read documents inserted or modified before
it commits these modifications to disk, regardless of write concern
level or journaling configuration. As a result, applications may
observe two classes of behaviors:

- For systems with multiple concurrent readers and writers, MongoDB
  will allow clients to read the results of a write operation
  before the write operation returns.

- If the :program:`mongod` terminates before the journal commits, even
  if a write returns successfully, queries may have read data that will
  not exist after the :program:`mongod` restarts.

Other database systems refer to these isolation semantics as *read
uncommitted*. For all inserts and updates, MongoDB modifies each
document in isolation: clients never see documents in intermediate
states. For multi-document operations, MongoDB does not provide any
multi-document transactions or isolation.

When :program:`mongod` returns a successful *journaled write concern*,
the data is fully committed to disk and will be available
after :program:`mongod` restarts.

For replica sets, write operations are durable only after a write
replicates and commits to the journal of a majority of the members of
the set. MongoDB regularly commits data to the journal regardless of
journaled write concern: use the :setting:`~storage.journal.commitIntervalMs`
to control how often a :program:`mongod` commits the journal.
