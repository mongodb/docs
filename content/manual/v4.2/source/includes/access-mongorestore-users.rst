To restore users and :ref:`user-defined roles <user-defined-roles>` on a
given database, you must have access to the ``admin`` database. MongoDB
stores the user data and role definitions for all databases in the
``admin`` database.

Specifically, to restore users to a given database, you must have the
:authaction:`insert` :ref:`action <security-user-actions>` on the ``admin``
database's :data:`admin.system.users` collection. The :authrole:`restore`
role provides this privilege.

To restore user-defined roles to a database, you must have the
:authaction:`insert` action on the ``admin`` database's
:data:`admin.system.roles` collection. The :authrole:`restore` role
provides this privilege.

If your database is running with authentication enabled, you must
possess the :authrole:`userAdmin` role on the database you are
restoring, or the :authrole:`userAdminAnyDatabase` role, which allows
you to restore user data to any database. The :authrole:`restore` role
also provides the requisite privileges.
