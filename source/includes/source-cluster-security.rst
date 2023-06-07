Various built-in roles provide sufficient privileges. For example:

.. include:: /includes/mongomirror-required-roles.rst

Specify the user name and password to |service| when prompted by
the live migration procedure.

|service| only supports :ref:`SCRAM <authentication-scram>` for
connecting to source clusters that enforce authentication. 

.. include:: /includes/fact-scram-pull-live-migration.rst

.. tip:: 

   To conceal credentials when migrating, consider :ref:`adding a temporary user 
   <add-mongodb-users>` with the minimum required permissions for 
   migration on the source cluster, and then :ref:`deleting <delete-mongodb-users>`
   the user once you complete the migration process.
