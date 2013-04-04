The :doc:`text search </core/text-search>` is currently a
*beta* feature. As a beta feature:

- You need to explicitly enable the feature before :ref:`creating a text
  index <create-text-index>` or using the :dbcommand:`text` command.

- To enable text search on :doc:`replica sets </core/replication>` and
  :doc:`sharded clusters </core/sharded-clusters>`, you need to
  enable on **each and every** :program:`mongod` for replica
  sets and on **each and every** :program:`mongos` for sharded clusters.
