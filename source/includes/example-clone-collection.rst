.. code-block:: javascript

   { cloneCollection: "users.profiles",
     from: "mongodb.example.net:27017",
     query: { active: true } }

This operation copies the ``profiles`` collection from the ``users``
database on the server at ``mongodb.example.net``. The operation only
copies documents that satisfy the query ``{ active: true }``.
