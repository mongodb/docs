Starting in MongoDB 7.0, you can use the new :variable:`USER_ROLES`
system variable to return user :ref:`roles <roles>`.

The scenario in this section shows users with various roles who have
limited access to documents in a collection containing budget
information.

The scenario shows one possible use of ``USER_ROLES``. The ``budget``
collection contains documents with a field named ``allowedRoles``. As
you'll see in the following scenario, you can write queries that compare
the user roles found in the ``allowedRoles`` field with the roles
returned by the ``USER_ROLES`` system variable.

.. note::

   For another ``USER_ROLES`` example scenario, see
   :ref:`create-view-user-roles-system-variable-medical-example`. That
   example doesn't store the user roles in the document fields, as is
   done in the following example.

For the budget scenario in this section, perform the following steps to
create the roles, users, and ``budget`` collection:

.. procedure::
   :style: normal

   .. step:: Create the roles

      Run:

      .. code-block:: javascript

         db.createRole( { role: "Marketing", roles: [], privileges: [] } )
         db.createRole( { role: "Sales", roles: [], privileges: [] } )
         db.createRole( { role: "Development", roles: [], privileges: [] } )
         db.createRole( { role: "Operations", roles: [], privileges: [] } )

   .. step:: Create the users

      Create users named ``John`` and ``Jane`` with the required roles.
      Replace the ``test`` database with your database name.

      .. code-block:: javascript

         db.createUser( {
            user: "John",
            pwd: "jn008",
            roles: [
               { role: "Marketing", db: "test" },
               { role: "Development", db: "test" },
               { role: "Operations", db: "test" },
               { role: "read", db: "test" }
            ]
         } )

         db.createUser( {
            user: "Jane",
            pwd: "je009",
            roles: [
               { role: "Sales", db: "test" },
               { role: "Operations", db: "test" },
               { role: "read", db: "test" }
            ]
         } )

   .. step:: Create the collection

      Run:

      .. code-block:: javascript

         db.budget.insertMany( [
            {
               _id: 0,
               allowedRoles: [ "Marketing" ],
               comment: "For marketing team",
               yearlyBudget: 15000
            }, 
            {
               _id: 1,
               allowedRoles: [ "Sales" ],
               comment: "For sales team",
               yearlyBudget: 17000,
               salesEventsBudget: 1000
            },
            {
               _id: 2,
               allowedRoles: [ "Operations" ],
               comment: "For operations team",
               yearlyBudget: 19000,
               cloudBudget: 12000
            },
            {
               _id: 3,
               allowedRoles: [ "Development" ],
               comment: "For development team",
               yearlyBudget: 27000
            }
         ] )
