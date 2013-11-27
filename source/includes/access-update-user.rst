A user must have access that includes the :authaction:`revokeRole`
:ref:`action <security-user-actions>` on all databases in order to update a
user's :data:`~admin.system.users.roles` array.

A user must have the :authaction:`grantRole` :ref:`action
<security-user-actions>` on a role's database to add the role to a user.

To modify *their own* ``pwd`` or :data:`~admin.system.users.customData`
fields, users must have the :authaction:`changeOwnPassword` and
:authaction:`changeOwnCustomData` :ref:`actions <security-user-actions>`
respectively on the ``cluster`` resource.

To change another user's ``pwd`` or ``customData`` field, a user must have
the :authaction:`changeAnyPassword` and :authaction:`changeAnyCustomData`
:ref:`actions <security-user-actions>` respectively on that user's database.
