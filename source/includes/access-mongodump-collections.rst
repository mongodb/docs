To backup all the databases in a cluster via :program:`mongodump`, you
should have the :authrole:`backup` role. The :authrole:`backup` role provides
the required privileges for backing up all databases. The role confers no
additional access, in keeping with the policy of :term:`least privilege`.

To backup a given database, you must have ``read`` access on the database.
Several roles provide this access, including the :authrole:`backup` role.

.. include:: /includes/fact-required-access-for-backup-profiling.rst
