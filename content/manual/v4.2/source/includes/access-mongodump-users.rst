To back up users and :ref:`user-defined roles <user-defined-roles>` for a
given database, you must have access to the ``admin`` database. MongoDB
stores the user data and role definitions for all databases in the
``admin`` database.

Specifically, to back up a given database's users, you must have the
:authaction:`find` :ref:`action <security-user-actions>` on the ``admin``
database's :data:`admin.system.users` collection. The :authrole:`backup`
and :authrole:`userAdminAnyDatabase` roles both provide this privilege.

To back up the user-defined roles on a database, you must have the
:authaction:`find` action on the ``admin`` database's
:data:`admin.system.roles` collection. Both the :authrole:`backup` and
:authrole:`userAdminAnyDatabase` roles provide this privilege.
