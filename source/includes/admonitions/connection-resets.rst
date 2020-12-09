.. important::

   Methods which reset the shell's connection to the server trigger a
   termination of all open :manual:`sessions </reference/server-sessions>`.
   The following methods reset the shell's connection:

   - ``db.auth``
   - ``Mongo.setReadPref``
   - ``Mongo.setReadConcern``
