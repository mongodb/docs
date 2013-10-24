.. note::

   The :authrole:`userAdmin` role is a database-specific privilege, and
   *only* grants a user the ability to administer users on a single
   database. However, for the ``admin`` database,
   :authrole:`userAdmin` allows a user the ability to gain
   :authrole:`userAdminAnyDatabase`. Thus, for the ``admin`` database
   **only**, these roles are effectively the same.
