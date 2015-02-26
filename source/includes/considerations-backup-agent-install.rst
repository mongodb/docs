MongoDB Requirements
++++++++++++++++++++

|mms| only supports backing up replica sets and sharded cluster, and
does *not* support backing up standalone instances.

|mms| only supports backup for replica sets that run MongoDB 2.0 or
later.

|mms| only supports backup for sharded clusters that run MongoDB 2.4 or
later.

.. only:: classic

   All backed up replica sets and config servers should maintain oplog
   entries for at least an hour on average over the last 24 hour
   period.

.. only:: onprem

   All backed up replica sets and config servers must be able to
   maintain oplog entries, by default, for at least 3 hours over the
   last 24 hour period. This window is configurable with the
   :setting:`brs.minimumReplicationOplogWindowHr` setting in the
   ``conf-mms.properties`` file for the |mms| application.
   See :doc:`/reference/configuration` for more information.

Agent Architecture
++++++++++++++++++

To avoid resource contention, run the agent on a host other
than the hosts where the MongoDB instances are running. Be sure the
agent can access the MongoDB hosts.

Running on Amazon EC2
+++++++++++++++++++++

If you run the Backup Agent on Amazon EC2, do not use the ``t1.micro``
instance type, which has a CPU scheduling policy that does not
typically provide sufficient capacity to support a Backup Agent for a
production deployment. Use a larger instance type instead.
