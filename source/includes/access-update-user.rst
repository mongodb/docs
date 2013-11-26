To update the :data:`~admin.system.users.roles` array, a user must have
access that includes the :authaction:`revokeRole` action on all
databases. To add roles in an update, a user must have access that
includes the :authaction:`grantRole` action on the database where
the role exists.

To modify *their own* ``pwd`` or :data:`~admin.system.users.customData`
fields, users must have access that includes the
:authaction:`changeOwnPassword` action and
:authaction:`changeOwnCustomData` action respectively on the
``cluster`` resource.

To change another user's ``pwd`` or ``customData`` field, a user must
have access that includes the :authaction:`changeAnyPassword` action
and :authaction:`changeAnyCustomData` action respectively on that
user's database.
