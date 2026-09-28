
Restart each secondary cluster member:

#. Use :program:`mongosh` to connect to each secondary cluster member,
   then use the :method:`db.shutdownServer` method to stop the server:

   .. code-block:: javascript

      use admin
      db.shutdownServer()

#. Restart the server.

#. Use the :method:`rs.status` method to determine the member state:

   .. code-block:: javascript

      rs.status().members

#. Wait for the ``stateStr`` field for this member to show a value of
   :replstate:`SECONDARY`, then restart the next secondary.

