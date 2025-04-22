Starting in MongoDB 5.0, the new server parameter
:parameter:`coordinateCommitReturnImmediatelyAfterPersistingDecision`
controls when transaction commit decisions are returned to the client.
In previous versions of MongoDB, the :doc:`shard
</core/sharded-cluster-shards>` transaction coordinator waited for all
members to acknowledge a :ref:`multi-document transaction
<transactions-atomicity>` commit before returning the commit decision to
the client.