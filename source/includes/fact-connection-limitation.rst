.. note:: 

   Only one user can authenticate on a connection to a {+dl+} at any 
   given time. If a user authenticates and then runs the ``db.auth()`` command, {+dl+} replaces previous user's permissions with the new user's permissions.

   The :manual:`connectionStatus </reference/command/connectionStatus>` 
   command shows only the newly authenticated user in the 
   ``authenticatedUsers`` output field.