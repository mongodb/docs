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

The |timeout| field defaults to ``15`` seconds in MongoDB 5.0.
          
Clients cannot open new connections to a :binary:`~bin.mongod` or
:binary:`~bin.mongos` that is shutting down.