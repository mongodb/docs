You must have the :authaction:`revokeRole` :ref:`action
<security-user-actions>` on all databases in order to update a role.

You must have the :authaction:`grantRole` :ref:`action
<security-user-actions>` on the database of each role in the ``roles`` array
to update the array.

You must have the :authaction:`grantRole`
:ref:`action <security-user-actions>` on the database of each privilege
in the ``privileges`` array to update the array. If a privilege's
resource spans databases, you must have :authaction:`grantRole` on the
``admin`` database. A privilege spans databases if the privilege is any of
the following:

- a collection in all databases

- all collections and all database

- the ``cluster`` resource

You must have the :authaction:`setAuthenticationRestriction`
:ref:`action <security-user-actions>` on the database of the target
role to update a role's ``authenticationRestrictions`` document.