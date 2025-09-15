If your deployment enforces access control, the user running
|method-name| must have the :authaction:`updateSearchIndex` privilege
action on the database or collection:

.. code-block:: javascript

   {
      resource: {
         db : <database>,
         collection: <collection>
      },
      actions: [ "updateSearchIndex" ]
   }

The built-in :authrole:`readWrite` and :authrole:`restore` roles provide
the ``updateSearchIndex`` privilege. The following example grants the
``readWrite`` role on the ``qa`` database:

.. code-block:: javascript

   db.grantRolesToUser(
      "<user>",
      [ { role: "readWrite", db: "qa" } ]
   )
