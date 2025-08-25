.. code-block:: java
   :emphasize-lines: 18, 38

   String appID = YOUR_APP_ID; // replace this with your App ID
   App app = new App(appID);
   Credentials anonymousCredentials = Credentials.anonymous();

   app.loginAsync(anonymousCredentials, it -> {
       if (it.isSuccess()) {
           Log.v("EXAMPLE", "Successfully authenticated anonymously.");
           String PARTITION = "PARTITION_YOU_WANT_TO_BUNDLE";

           // you can only create realm copies on a background thread with a looper.
           // HandlerThread provides a Looper-equipped thread.
           HandlerThread handlerThread = new HandlerThread("CopyARealmHandler");
           handlerThread.start();
           Handler handler = new Handler(handlerThread.getLooper());
           handler.post(new Thread(new Runnable() { @Override public void run() {
               SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
                       // wait for the realm to download all data from the backend before opening
                       .waitForInitialRemoteData() 
                       .build();

               Realm realm = Realm.getInstance(config);
               Log.v("EXAMPLE", "Successfully opened a realm.");

               // write a copy of the realm you can manually copy to your production application assets
               File outputDir = activity.getApplicationContext().getCacheDir();
               File outputFile = new File(outputDir.getPath() + "/" +  PARTITION + "_bundled.realm");

               // ensure all local changes have synced to the backend
               try {
                   app.getSync().getSession(config).uploadAllLocalChanges(10000, TimeUnit.MILLISECONDS);
               } catch (InterruptedException e) {
                   e.printStackTrace();
               }

               // cannot write to file if it already exists. Delete the file if already there
               outputFile.delete();

               realm.writeCopyTo(outputFile); 

               // search for this log line to find the location of the realm copy
               Log.i("EXAMPLE", "Wrote copy of realm to " + outputFile.getAbsolutePath());

               // always close a realm when you're done using it
               realm.close();
           }}));
       } else {
           Log.e("EXAMPLE", "Failed to authenticate: " + it.getError().toString());
       }
   });
