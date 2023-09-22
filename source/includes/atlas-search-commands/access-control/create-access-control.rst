If your deployment enforces access control, the user running
|method-name| must have the :authaction:`createSearchIndexes` privilege
action on the database or collection:

.. code-block:: javascript

   {
      resource: {
         db : <database>,
         collection: <collection>
      },
      actions: [ "createSearchIndexes" ]
   }

The built-in :authrole:`readWrite` role provides the
``createSearchIndexes`` privilege. The following example grants
``accountUser01`` the ``readWrite`` role on the ``products`` database:

.. code-block:: javascript

   db.grantRolesToUser(
      "accountUser01",
      [ { role: "readWrite", db: "products" } ]
   )
