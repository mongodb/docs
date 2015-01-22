To backup all the databases in a cluster via :program:`mongodump`, you
should have the :authrole:`backup` role. The :authrole:`backup` role provides
the necessary privileges for backing up all databases. The role confers no
additional access, in keeping with the policy of :term:`least privilege`.

To backup a given database, you must have ``read`` access on the database.
Several roles provide this access, including the :authrole:`backup` role.

To backup the :data:`system.profile <<database>.system.profile>`
collection, which is created when :ref:`database profiling
<database-profiling>` is activated, you must have **additional**
``read`` access on certain system collections in the database. Several
roles provide this access, including the :authrole:`clusterAdmin` and
:authrole:`dbAdmin` roles.
