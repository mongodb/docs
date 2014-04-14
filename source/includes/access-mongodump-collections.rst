To backup all the databases in a cluster via :program:`mongodump`, you
should have the :authrole:`backup` role. The :authrole:`backup` role provides
all the needed privileges for backing up all database. The role confers no
additional access, in keeping with the policy of :term:`least privilege`.

To backup a given database, you must have ``read`` access on the database.
Several roles provide this access, including the :authrole:`backup` role.

To backup the ``system.profile`` collection in a database, you must have
``read`` access on certain system collections in the database. Several roles
provide this access, including the :authrole:`clusterAdmin` and
:authrole:`dbAdmin` roles.
