MongoDB Requirements
++++++++++++++++++++

|mms| only supports backing up replica sets and sharded clusters, and
does *not* support backing up standalone instances.

|mms| only supports backup for replica sets that run MongoDB 2.0 or
later.

|mms| only supports backup for sharded clusters that run MongoDB 2.4.3 or
later.

.. include:: /includes/extracts/backup-agent-install-requirements.rst

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
