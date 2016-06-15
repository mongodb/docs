.. code-block:: javascript

   db.runCommand( { cloneCollection: "users.profiles",
                    from: "mongodb.example.net:27017",
                    query: { 'active' : true } 
                  } )

.. include:: /includes/example-clone-collection-text.rst