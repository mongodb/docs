.. warning::

   - The :method:`rs.reconfig()` shell method can force the current
     primary to step down, which causes an :ref:`election
     <replica-set-elections>`. When the primary steps down, the
     :program:`mongod` closes all client connections. While this
     typically takes 10-20 seconds, try to make these changes during
     scheduled maintenance periods.

   - To successfully reconfigure a replica set, a majority of the
     members must be accessible. If your replica set has an even number
     of members, add an :doc:`arbiter
     </tutorial/add-replica-set-arbiter>` to ensure that members can
     quickly obtain a majority of votes in an election for primary.
