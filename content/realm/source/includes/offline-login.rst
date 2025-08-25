When your Realm application authenticates a user, it caches the user's 
credentials. You can check for existing user credentials to bypass the 
login flow and access the cached user. Use this to open a realm offline. 

.. note:: Initial login requires a network connection

   When a user signs up for your app, or logs in for the first time with an 
   existing account on a client, the client must have a network connection.
   Checking for cached user credentials lets you open a realm offline, but
   only if the user has previously logged in while online.