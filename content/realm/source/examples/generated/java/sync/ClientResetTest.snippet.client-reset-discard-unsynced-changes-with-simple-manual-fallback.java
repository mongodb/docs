String appID = YOUR_APP_ID; // replace this with your App ID
App app = null;
AtomicReference<App> globalApp = new AtomicReference<>(app);
// accessing the app from within the lambda below requires an effectively final object
app = new App(new AppConfiguration.Builder(appID)
        .defaultSyncClientResetStrategy(new DiscardUnsyncedChangesStrategy() {
            @Override
            public void onBeforeReset(Realm realm) {
                Log.w("EXAMPLE", "Beginning client reset for " + realm.getPath());
            }

            @Override
            public void onAfterReset(Realm before, Realm after) {
                Log.w("EXAMPLE", "Finished client reset for " + before.getPath());
            }

            @Override
            public void onError(SyncSession session, ClientResetRequiredError error) {
                Log.e("EXAMPLE", "Couldn't handle the client reset automatically." +
                        " Falling back to manual client reset execution: "
                        + error.getErrorMessage());
                // close all instances of your realm -- this application only uses one
                globalRealm.close();

                try {
                    Log.w("EXAMPLE", "About to execute the client reset.");
                    // execute the client reset, moving the current realm to a backup file
                    error.executeClientReset();
                    Log.w("EXAMPLE", "Executed the client reset.");
                } catch (IllegalStateException e) {
                    Log.e("EXAMPLE", "Failed to execute the client reset: " + e.getMessage());

                    // The client reset can only proceed if there are no open realms.
                    // if execution failed, ask the user to restart the app, and we'll client reset
                    // when we first open the app connection.
                    AlertDialog restartDialog = new AlertDialog.Builder(activity)
                            .setMessage("Sync error. Restart the application to resume sync.")
                            .setTitle("Restart to Continue")
                            .create();
                    restartDialog.show();
                }

                // open a new instance of the realm. This initializes a new file for the new realm
                // and downloads the backend state. Do this in a background thread so we can wait
                // for server changes to fully download.
                ExecutorService executor = Executors.newSingleThreadExecutor();
                executor.execute(() -> {
                    Realm newRealm = Realm.getInstance(globalConfig);

                    // ensure that the backend state is fully downloaded before proceeding
                    try {
                        globalApp.get().getSync().getSession(globalConfig).downloadAllServerChanges(10000,
                                TimeUnit.MILLISECONDS);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    Log.w("EXAMPLE",
                            "Downloaded server changes for a fresh instance of the realm.");

                    newRealm.close();
                });

                // execute the recovery logic on a background thread
                try {
                    executor.awaitTermination(20000, TimeUnit.MILLISECONDS);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        })
        .build());
globalApp.set(app);
