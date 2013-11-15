To create a role on a database, a user must have access that includes
the :authaction:`createRole` action on that database.

To grant a privilege to the role, a user must have access that includes the
:authaction:`grantAnyRole` action on the database the privilege
targets. If the privilege targets multiple databases or the
``cluster`` resource , the user must have access that includes the :authaction:`grantAnyRole`
action on the ``admin`` database.

To specify roles from which the new role inherits from, a
user must have access that includes the
:authaction:`grantAnyRole` action on the inherited role's database.
