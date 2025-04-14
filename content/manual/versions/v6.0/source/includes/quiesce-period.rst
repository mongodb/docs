Starting in MongoDB 5.0, :binary:`~bin.mongod` and :binary:`~bin.mongos`
enter a quiesce period to allow any ongoing database operations to
complete before shutting down.

If a :binary:`~bin.mongod` :term:`primary` receives a shut down request,
the primary:

#. Attempts to step down to a :term:`secondary`.

   If the step down fails and a:

   - :dbcommand:`shutdown` or :method:`db.shutdownServer()` command
     was run, :binary:`~bin.mongod` only continues the shut down steps
     if the |force| field is true, or a
   
   - ``SIGTERM`` signal was sent to :binary:`~bin.mongod`,
     :binary:`~bin.mongod` always continues the shut down steps.

#. Enters the quiesce period.

#. Ends any remaining database operations.

#. Shuts down.

For a :binary:`~bin.mongod` :term:`secondary` or :binary:`~bin.mongos`
shut down request, the quiesce period is entered after a shut down was
requested.

The quiesce period is specified by the:

- |timeout| field if a :dbcommand:`shutdown` or
  :method:`db.shutdownServer()` command was run, or

- :parameter:`shutdownTimeoutMillisForSignaledShutdown` server
  parameter if a ``SIGTERM`` signal was sent to :binary:`~bin.mongod`,
  or
  
- :parameter:`mongosShutdownTimeoutMillisForSignaledShutdown` server
  parameter if a ``SIGTERM`` signal was sent to :binary:`~bin.mongos`.

Clients cannot open new connections to a :binary:`~bin.mongod` or
:binary:`~bin.mongos` that is shutting down.

|timeout| specifies a time period in seconds. The default is:

- 15 seconds starting in MongoDB 5.0.
- 10 seconds in MongoDB versions earlier than 5.0.

:binary:`~bin.mongod` uses |timeout| as follows:

- If the current node is the :term:`primary` node of a replica set,
  ``mongod`` waits for a period of up to the number of seconds specified
  by the |timeout| field for an electable node to catch up before
  stepping down the primary node. For details about the catch up time,
  see :term:`replication lag <replication lag>`.
- If the current node is in the :replstate:`SECONDARY` state after
  stepping down from being the primary, any remaining time specified in
  |timeout| is used for a quiesce period, which allows existing
  operations to complete. New operations are sent to other replica set
  nodes.

Starting in MongoDB 5.0, :binary:`~bin.mongos` uses |timeout| as a
quiesce period, which allows existing operations to complete. New
operations are sent to other :binary:`~bin.mongos` nodes. In MongoDB
versions earlier than 5.0, :binary:`~bin.mongos` shuts down immediately
and does not use |timeout|.
