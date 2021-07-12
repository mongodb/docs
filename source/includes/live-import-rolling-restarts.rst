After the migration process completes, your cluster restarts each of
its members one at a time. This is called a rolling restart, and as
a consequence, a failover will occur on the primary. To ensure a
smooth migration, consider running a :doc:`/tutorial/test-failover`
procedure before migrating your data to the target cluster.
