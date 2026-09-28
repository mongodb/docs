The following example assigns the ``clusterManager`` role to a user
named ``testUser``:

.. code-block:: javascript

   db.grantRolesToUser(
      "testUser",
      [ "clusterManager" ]
   )
