Realm provides :ref:`many authentication providers <authentication-providers>` 
to log users into your app. Each provider creates a unique user identity. 
Realm lets you merge multiple credentials into one user identity.

Credentials must be linked prior to logging a user in. Once credentials are used 
to login a user, you cannot link that credential anymore. 
Also, you cannot link multiple email/password credentials together.

Example
-------

Consider an application that offers :ref:`anonymous login
<anonymous-authentication>`, which allows users to explore the app without 
registering. If a user wants to continue using the application, they can create 
a permanent account by using another authentication provider. Realm 
creates a new ``User`` object. The app can then link the new identity with the 
current user.

.. note:: 

   Depending on how you have configured email/password authentication, there may 
   be additional steps (confirming the email address, for example) before the 
   new account is created and can be linked.
   