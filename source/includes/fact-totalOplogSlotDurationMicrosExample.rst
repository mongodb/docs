Consider the following writes with commit timestamps:

- writeA with Timestamp1
- writeB with Timestamp2
- writeC with Timestamp3

Suppose writeB commits first at Timestamp2. Replication is paused
until writeA commits because writeA's oplog entry with Timestamp1 is
required for replication to copy the oplog to secondary replica set
members. 
