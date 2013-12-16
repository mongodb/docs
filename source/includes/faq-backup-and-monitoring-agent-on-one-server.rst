.. heading is "Can I run the Backup and Monitoring agents on a single system."

There is no technical restriction that prevents the Backup agent and
the Monitoring agent from running on a single system or host. However,
both agents have resource requirements, and running both on a single
system can affect the ability of these agents support your deployment
in MMS.

The resources required by the Backup agent depend on rate and size
of new oplog entries (i.e. total oplog gigabyte/per-hour produced.)
The resources required by the Monitoring agent depend on the number of
monitored :program:`mongod` instances and the total number of
:term:`databases <database>` provided by the :program:`mongod` instances.
