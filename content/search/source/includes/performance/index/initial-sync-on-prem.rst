|fts| starts the initial sync process in the following scenarios:

- When you create a new index, the ``mongot`` process performs an
  initial sync to build the index.
- If you add shards to a collection with an existing |fts| index, an
  initial sync occurs on the newly added shards for that index. Each
  shard's |fts| index contains only the documents from the collection
  that exist on that shard.
- If the ``mongod`` oplog rolls over before ``mongot`` catches up,
  ``mongot`` falls out of steady state replication and performs an
  initial sync to rebuild the index.

The index isn't queryable while its initial sync runs. To monitor the
progress of an initial sync, review the
``mongot_replication_mongodb_indexManagerState`` metric, which reports
the ``INITIAL_SYNC`` state while the sync runs and the
``STEADY_STATE`` state after it completes. To learn more, see
:ref:`mongot-metrics-reference`.

If an initial sync takes longer than expected or an index repeatedly
returns to the ``INITIAL_SYNC`` state, see the following
troubleshooting topics:

- :ref:`mongot-troubleshooting-initial-sync`
- :ref:`mongot-troubleshooting-resync`
