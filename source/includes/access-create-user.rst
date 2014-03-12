You must have the :authaction:`createUser` :ref:`action
<security-user-actions>` on a database to create a new user on that
database.

You must have the :authaction:`grantRole` :ref:`action
<security-user-actions>` on a role's database to grant the role to another
user.

If you have the :authrole:`userAdmin` or :authrole:`userAdminAnyDatabase`
role, or if you are authenticated using the :ref:`localhost exception
<localhost-exception>`, you have those actions.
