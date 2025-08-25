.. code-block:: javascript

   // Initialize your App.
   const app = new Realm.App({
     id: "<yourAppId>",
   });

   // Authenticate an anonymous user.
   const anonymousUser = await app.logIn(Realm.Credentials.anonymous());

   // Create a `SyncConfiguration` object.
   const config = {
     schema: [QuickstartTask],
     sync: {
       // Use the previously-authenticated anonymous user.
       user: anonymousUser,
       // Set flexible sync to true to enable sync.
       flexible: true,
       // Define initial subscriptions to start syncing data as soon as the
       // realm is opened.
       initialSubscriptions: {
         update: (subs, realm) => {
           subs.add(
             // Get objects that match your object model, then filter them by
             // the `owner_id` queryable field
             realm
               .objects(QuickstartTask)
               .filtered(`owner_id == "${anonymousUser.id}"`)
           );
         },
       },
     },
   };

   const realm = await Realm.open(config);
