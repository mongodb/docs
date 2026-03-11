- :guilabel:`MongoDB Logs` Diagnostic logs written by
  each |mongod| server process. They record server startup and shutdown,
  configuration, connections, slow queries, replication, sharding activity,
  and other operational events.

- :guilabel:`MongoDB Audit Logs` Auditing 
  logs emitted by |mongod| that track system event actions such as 
  authentication attempts, authorization checks, role changes, and 
  other security-relevant operations. These logs are separate from the 
  main MongoDB log.

- :guilabel:`MongoDB Router Logs` Diagnostic logs 
  written by each |mongos| router process in a sharded cluster. They 
  capture router-specific behavior such as routing of queries to 
  shards, sharding metadata refreshes, and general process diagnostics.

- :guilabel:`MongoDB Router Audit Logs` Auditing logs emitted by 
  |mongos| router processes, recording the 
  same kinds of audited system events but from the router's perspective 
  in a sharded deployment.

To learn more, see :ref:`mongodb-logs`.
