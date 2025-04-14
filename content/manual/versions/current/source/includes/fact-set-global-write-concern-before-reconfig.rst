Starting in MongoDB 5.0, you must explicitly set the global default
:ref:`write concern <write-concern>` before attempting to reconfigure a
:term:`replica set <replica set>` with a
:ref:`configuration <replica-set-configuration-settings>`
that would change the implicit default write concern. To set the global
default write concern, use the :dbcommand:`setDefaultRWConcern` command.
