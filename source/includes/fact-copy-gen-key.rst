|onprem| uses the ``gen.key`` file to encrypt data at rest in the
:ref:`mms-application-database` and the
:ref:`mms-backup-blockstore-database`. If the |application| and Backup
Daemon run on different servers, you must copy the ``gen.key`` from the
|application|'s server to the daemon's server.
