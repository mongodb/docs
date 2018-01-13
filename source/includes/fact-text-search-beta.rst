The :ref:`text search <text-search-text-command>` is currently a
*beta* feature. As a beta feature:

- You need to explicitly enable the feature before :ref:`creating a text
  index <create-text-index>` or using the :dbcommand:`text` command.

- To enable text search on :doc:`replica sets </core/replication>` and
  :doc:`sharded clusters </core/sharding>`, you need to
  enable on **each and every** :binary:`~bin.mongod` for replica
  sets and on **each and every** :binary:`~bin.mongos` for sharded clusters.
