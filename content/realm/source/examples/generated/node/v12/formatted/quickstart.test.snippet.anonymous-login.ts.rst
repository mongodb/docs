.. code-block:: typescript

   // Initialize your App.
   const app = new Realm.App({
     id: "<yourAppId>",
   });

   // Authenticate an anonymous user.
   const anonymousUser = await app.logIn(Realm.Credentials.anonymous());
