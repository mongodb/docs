You must have the :authaction:`createRole` :ref:`action
<security-user-actions>` on a database to create a role on that database.

You must have the :authaction:`grantRole` :ref:`action
<security-user-actions>` on the database that a privilege targets in order
to grant that privilege to a role. If the privilege targets multiple
databases or the ``cluster`` resource , you must have the
:authaction:`grantRole` action on the ``admin`` database.

You must have the :authaction:`grantRole` :ref:`action
<security-user-actions>` on a role's database to grant the role to another
role.
