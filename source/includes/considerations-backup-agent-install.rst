MongoDB Requirements
++++++++++++++++++++

MMS only supports backup for sharded clusters that run MongoDB 2.4 or
later.

MMS only supports backup for replica sets that run MongoDB 2.0 or
later.

Agent Architecture
++++++++++++++++++

To avoid resource contention, run the agent on a host other
than the hosts where the MongoDB instances are running. Be sure the
agent can access the MongoDB hosts.

Running on Amazon EC2
+++++++++++++++++++++

If you run the Backup agent on Amazon EC2, do not use the ``t1.micro``
instance type, which has a CPU scheduling policy that does not
typically provide sufficient capacity to support a Backup agent for a
production deployment. Use a larger instance type instead.
