You must have access that includes the :authaction:`revokeRole`
:ref:`action <security-user-actions>` on all databases in order to update a
user's :data:`~admin.system.users.roles` array.

You must have the :authaction:`grantRole` :ref:`action
<security-user-actions>` on a role's database to add a role to a user.

To change another user's ``pwd`` or ``customData`` field, you must have
the :authaction:`changeAnyPassword` and :authaction:`changeAnyCustomData`
:ref:`actions <security-user-actions>` respectively on that user's database.
