.. the including document should define a |local-cmd-name| replacement.

In the ``roles`` field you can specify both
:ref:`system roles <system-user-roles>` and custom roles created
with |local-cmd-name|. The ``roles`` array can take both
documents and strings. Specify a role as a document if the role
exists in another database. Specify the role as a string name if it
exists in the current database. For more information on specifying
roles, see the :data:`~admin.system.roles.roles` array.
