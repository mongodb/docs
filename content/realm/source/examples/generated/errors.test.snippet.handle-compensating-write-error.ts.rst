.. code-block:: typescript
   :emphasize-lines: 34

   const errorCallback: ErrorCallback = (session, error) => {
     // Check if error type matches CompensatingWriteError.
     if (error instanceof CompensatingWriteError) {
       // Handle the compensating write error as needed.
       console.debug({
         name: error.name,
         code: error.code,
         message: error.message,
         atlasLogUrl: error.logUrl,
       });

       const compensatingWrites = error.writes.sort((a, b) =>
         (a.primaryKey as BSON.ObjectId)
           .toString()
           .localeCompare((b.primaryKey as BSON.ObjectId).toString())
       );

       console.debug(compensatingWrites);
     }
   };

   const app = new Realm.App({
     id: APP_ID,
   });

   const credentials = Credentials.anonymous();
   await app.logIn(credentials);

   const realm = await Realm.open({
     schema: [Person, Turtle],
     sync: {
       flexible: true,
       user: app.currentUser!,
       onError: errorCallback, 
     },
   });
