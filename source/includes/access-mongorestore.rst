.. versionchanged:: 2.5.4

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
