To create a role in a database, you must have:

- the :authaction:`createRole` :ref:`action <security-user-actions>` on
  that :ref:`database resource <resource-specific-db>`.

- the :authaction:`grantRole` :ref:`action <security-user-actions>` on
  that database to specify privileges for the new role as well as to
  specify roles to inherit from.

Built-in roles :authrole:`userAdmin` and
:authrole:`userAdminAnyDatabase` provide :authaction:`createRole` and
:authaction:`grantRole` actions on their respective :doc:`resources
</reference/resource-document>`.
