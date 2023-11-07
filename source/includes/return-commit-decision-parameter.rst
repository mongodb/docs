The server parameter
:parameter:`coordinateCommitReturnImmediatelyAfterPersistingDecision`
controls when transaction commit decisions are returned to the client.

The parameter was introduced in MongDB 5.0 with a default value of
``true``. In MongoDB 5.0.10 the default value changes to ``false``. 

When ``coordinateCommitReturnImmediatelyAfterPersistingDecision`` is
``false``, the :ref:`shard <shards-concepts>` transaction coordinator
waits for all members to acknowledge a :ref:`multi-document transaction
<transactions-atomicity>` commit before returning the commit decision to
the client.