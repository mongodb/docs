If the driver has access to the ``mongocryptd`` process, it spawns the
process by default.

.. important:: Start on Boot

  If possible, start ``mongocryptd`` on boot, rather than launching it
  on demand.

Configure how the driver starts ``mongocryptd`` through the 
following parameters:

.. list-table::
    :header-rows: 1
    :stub-columns: 1
    :widths: 30 70

    * - Name
      - Description

    * - port
      - | The port from which ``mongocryptd`` listens for messages.
        | *Default*: ``27020``

    * - idleShutdownTimeoutSecs
      - | Number of idle seconds the ``mongocryptd`` process waits 
          before exiting.
        | *Default*: ``60``

    * - mongocryptdURI
      - | The URI on which to run the ``mongocryptd`` process.
        | *Default*: ``"mongodb://localhost:27020"``

    * - mongocryptdBypassSpawn
      - | When ``true``, prevents the driver from automatically 
          spawning ``mongocryptd``.
        | *Default*: ``false``

    * - mongocryptdSpawnPath
      - | The full path to ``mongocryptd``.
        | *Default*: Defaults to empty string and spawns from the system
          path.
        
If a ``mongocryptd`` process is already running on the port specified by 
the driver, the driver may log a warning and continue without spawning a 
new process. Any settings specified by the driver only apply once the 
existing process exits and a new encrypted client attempts to connect.