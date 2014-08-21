You must have the :authaction:`createUser` :ref:`action
<security-user-actions>` on a database to create a new user on that
database.

You must have the :authaction:`grantRole` :ref:`action
<security-user-actions>` on a role's database to grant the role to another
user.

If you have the :authrole:`userAdmin` or :authrole:`userAdminAnyDatabase`
role you have those actions.

.. note::

   If your database has no users, you *must* connect to :program:`mongod`
   using the :ref:`localhost exception <localhost-exception>`
   or use the :option:`--noauth <mongod --noauth>` option when starting
   :program:`mongod`. In such cases, skip to Step 3 of the procedure.

   Note that if users exist in the MongoDB database, but none of them have the
   appropriate prerequisites or you do not have access to them, only the
   :option:`--noauth <mongod --noauth>` method is available.
