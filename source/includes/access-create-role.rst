To create a role on a database, a user must have access that includes
the :authaction:`createRole` action on that database.

To grant a privilege to the role, a user must have access that includes the
:authaction:`grantAnyRole` action on the database the privilege
targets. If the privilege targets multiple databases or the
``cluster`` resource , the user must have access that includes the :authaction:`grantAnyRole`
action on the ``admin`` database.

To add a role to the :data:`~admin.system.roles.roles` array, a
user must have access that includes the
:authaction:`grantAnyRole` action on the contained role's database.
