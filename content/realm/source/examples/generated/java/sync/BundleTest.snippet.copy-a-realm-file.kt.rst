.. code-block:: kotlin
   :emphasize-lines: 17, 39

   val appID: String = YOUR_APP_ID // replace this with your App ID
   val app = App(appID)
   val anonymousCredentials = Credentials.anonymous()
   app.loginAsync(anonymousCredentials) { it: App.Result<User?> ->
       if (it.isSuccess) {
           Log.v("EXAMPLE", "Successfully authenticated anonymously.")
           val PARTITION = "PARTITION_YOU_WANT_TO_BUNDLE"

           // you can only create realm copies on a background thread with a looper.
           // HandlerThread provides a Looper-equipped thread.
           val handlerThread = HandlerThread("CopyARealmHandler")
           handlerThread.start()
           val handler = Handler(handlerThread.looper)
           handler.post(Thread {
               val config = SyncConfiguration.Builder(app.currentUser(), PARTITION)
                   // wait for the realm to download all data from the backend before opening
                   .waitForInitialRemoteData() 
                   .build()

               val realm : Realm = Realm.getInstance(config);
               Log.v("EXAMPLE", "Successfully opened a realm.")

               // write a copy of the realm you can manually copy to your production application assets
               val outputDir = activity!!.applicationContext.cacheDir
               val outputFile =
                   File(outputDir.path + "/" + PARTITION + "_bundled.realm")

               // ensure all local changes have synced to the backend
               try {
                   app.sync.getSession(config)
                       .uploadAllLocalChanges(10000, TimeUnit.MILLISECONDS)
               } catch (e: InterruptedException) {
                   e.printStackTrace()
               }

               // cannot write to file if it already exists. Delete the file if already there
               outputFile.delete()

               realm.writeCopyTo(outputFile) 

               // search for this log line to find the location of the realm copy
               Log.i("EXAMPLE", "Wrote copy of realm to " + outputFile.absolutePath)

               // always close a realm when you're done using it
               realm.close()
           })
       } else {
           Log.e("EXAMPLE", "Failed to authenticate: ${it.error}")
       }
   }
