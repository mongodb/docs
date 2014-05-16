MongoDB Requirements
++++++++++++++++++++

MMS can only back up sharded clusters that running version 2.4 or later. However,
MMS can back up MongoDB 2.0 replica sets or later.

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
