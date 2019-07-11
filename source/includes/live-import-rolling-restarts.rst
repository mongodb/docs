After the migration process is complete, your destination replica set
will restart each of its members one at a time. This is called a rolling
restart, and as a consequence, a failover will occur on the primary. To ensure a smooth migration, it is recommended that you perform
a :doc:`/tutorial/test-failover` procedure prior to migrating your data to
the destination cluster.
