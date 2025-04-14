Use the :dbcommand:`createUser` command to create a user named
``accountAdmin01`` on the ``products`` database:

.. code-block:: javascript

   db.getSiblingDB("products").runCommand( {
      createUser: "accountAdmin01",
      pwd: passwordPrompt(), 
      customData: { employeeId: 12345 },
      roles: [ { role: 'readWrite', db: 'products' } ]
   } )

The user contains a ``customData`` field of ``{ employeeId: 12345 }``.
