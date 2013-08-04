.. note::

   The :authrole:`userAdmin` is a database specific privilege, and
   *only* grants a user the ability to administer users on a single
   database. However, for the ``admin`` database,
   :authrole:`userAdmin` allows a user the ability to gain
   :authrole:`userAdminAnyDatabase`, and so for the ``admin`` database
   **only** these roles are effectively the same.
