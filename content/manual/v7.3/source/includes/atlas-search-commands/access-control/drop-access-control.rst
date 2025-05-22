If your deployment enforces access control, the user running
|method-name| must have the :authaction:`dropSearchIndex` privilege
action on the database or collection:

.. code-block:: javascript

   {
      resource: {
         db : <database>,
         collection: <collection>
      },
      actions: [ "dropSearchIndex" ]
   }

The built-in :authrole:`dbAdmin` and :authrole:`readWrite` roles provide
the ``dropSearchIndex`` privilege. The following example grants the
``readWrite`` role on the ``qa`` database:

.. code-block:: javascript

   db.grantRolesToUser(
      "<user>",
      [ { role: "readWrite", db: "qa" } ]
   )
