.. important::

   Methods which reset the shell's connection to the server trigger a
   termination of all open server :manual:`sessions
   </reference/server-sessions>`. When a session ends, all in-progress
   operations are terminated as well, and the client must re-authenticate if 
   authentication is enabled.

   The following methods reset the shell's
   connection:

   - ``db.auth``
   - ``Mongo.setReadPref``
   - ``Mongo.setReadConcern``
