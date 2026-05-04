To create an admin user on your ``mongod``, run the following
commands, replacing ``<password>`` with the desired password 
for the ``myAdmin`` user:

.. code-block:: javascript

   use admin

   db.createUser(
     {
       user: "myAdmin",
       pwd: "<password>",
       roles: [
          {
            role: "root",
            db: "admin"
          }
        ]
     } 
   )
