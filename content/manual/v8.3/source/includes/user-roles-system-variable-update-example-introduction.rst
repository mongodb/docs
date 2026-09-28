Starting in MongoDB 7.0, you can use the new :variable:`USER_ROLES`
system variable to return user :ref:`roles <roles>`.

The example in this section shows updates to fields in a collection
containing medical information. The example reads the current user roles
from the ``USER_ROLES`` system variable and only performs the updates if
the user has a specific role.

.. include:: /includes/user-roles-system-variable-example-description-start.rst

The example creates these users:

- ``James`` with a ``Billing`` role.
- ``Michelle`` with a ``Provider`` role.

Perform the following steps to create the roles, users, and collection:

.. procedure::
   :style: normal

   .. step:: Create the roles

      Create roles named ``Billing`` and ``Provider`` with the required
      privileges and resources.

      Run:

      .. code-block:: javascript

         db.createRole( { role: "Billing", privileges: [ { resource: { db: "test",
            collection: "medicalView" }, actions: [ "find" ] } ], roles: [ ] } )
         db.createRole( { role: "Provider", privileges: [ { resource: { db: "test",
            collection: "medicalView" }, actions: [ "find" ] } ], roles: [ ] } )

   .. step:: Create the users

      Create users named ``James`` and ``Michelle`` with the required
      roles.

      .. code-block:: javascript

         db.createUser( {
            user: "James",
            pwd: "js008",
            roles: [
               { role: "Billing", db: "test" }
            ]
         } )

         db.createUser( {
            user: "Michelle",
            pwd: "me009",
            roles: [
               { role: "Provider", db: "test" }
            ]
         } )

   .. step:: Create the collection

      Run:

      .. code-block:: javascript

         db.medical.insertMany( [
            {
               _id: 0,
               patientName: "Jack Jones",
               diagnosisCode: "CAS 17",
               creditCard: "1234-5678-9012-3456"
            },
            {
               _id: 1,
               patientName: "Mary Smith",
               diagnosisCode: "ACH 01",
               creditCard: "6541-7534-9637-3456"
            }
         ] )

Log in as as ``Michelle``, who has the ``Provider`` role, and perform an
update:
