- To create a new user in a database, you must have
  :authaction:`createUser` :ref:`action <security-user-actions>` on
  that :ref:`database resource <resource-specific-db>`.

- To grant roles to a user, you must have the :authaction:`grantRole`
  :ref:`action <security-user-actions>` on the role's database.

Built-in roles :authrole:`userAdmin` and
:authrole:`userAdminAnyDatabase` provide :authaction:`createUser` and
:authaction:`grantRole` actions on their respective :doc:`resources
</reference/resource-document>`.
