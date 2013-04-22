.. warning::

   The :method:`rs.reconfig()` shell method can force the current
   primary to step down, which causes an :ref:`election
   <replica-set-elections>`.  When the primary steps down, the
   :program:`mongod` closes all client connections. While this
   typically takes 10-20 seconds, attempt to make these changes during
   scheduled maintenance periods. To successfully reconfigure a
   replica set, a majority of the members must be accessible.
