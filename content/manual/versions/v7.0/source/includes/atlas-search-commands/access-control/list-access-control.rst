If your deployment enforces access control, the user running
|method-name| must have the :authaction:`listSearchIndexes` privilege
action on the database or collection:

.. code-block:: javascript

   {
      resource: {
         db : <database>,
         collection: <collection>
      },
      actions: [ "listSearchIndexes" ]
   }

The built-in :authrole:`read` role provides the the
``listSearchIndexes`` privilege. The following example grants the
``read`` role on the ``qa`` database:

.. code-block:: javascript

   db.grantRolesToUser(
      "<user>",
      [ { role: "read", db: "qa" } ]
   )
