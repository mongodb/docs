- To create a new user in a database, you must have the
  :authaction:`createUser` :ref:`action <security-user-actions>` on
  that :ref:`database resource <resource-specific-db>`.

- To grant roles to a user, you must have the :authaction:`grantRole`
  :ref:`action <security-user-actions>` on the role's database.

The :authrole:`userAdmin` and
:authrole:`userAdminAnyDatabase` built-in roles provide
:authaction:`createUser` and :authaction:`grantRole` actions on their
respective :ref:`resources <resource-document>`.
