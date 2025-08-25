public void handleManualReset(App app, SyncSession session, ClientResetRequiredError error) {
    Log.w("EXAMPLE", "Beginning manual reset recovery.");

    // Close all instances of the realm -- this application only uses one
    globalRealm.close();

    try {
        Log.w("EXAMPLE", "About to execute the client reset.");
        // Move the realm to a backup file -- execute the client reset
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

    // Open new instance of the realm. This initializes a new file for the new realm
    // and downloads the backend state. Do this in a background thread so we can wait
    // for server changes to fully download.
    ExecutorService executor = Executors.newSingleThreadExecutor();
    executor.execute(() -> {
        Realm newRealm = Realm.getInstance(globalConfig);

        // Download all realm data from the backend -- ensure that the backend state is
        // fully downloaded before proceeding
        try {
            app.getSync().getSession(globalConfig).downloadAllServerChanges(10000,
                    TimeUnit.MILLISECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Log.w("EXAMPLE", "Opened a fresh instance of the realm.");

        // Open the the realm backup -- as a dynamic realm
        // (no formal schema; access all data through field lookups)
        DynamicRealm backupRealm = DynamicRealm.getInstance(error.getBackupRealmConfiguration());
        Log.w("EXAMPLE", "Opened the backup realm.");

        // To only migrate unsynced data,
        // you'll need to know the last time the realm synced.
        // you can keep track of successful sync connections
        // locally in an object in the realm
        DynamicRealmObject lastSuccessfulSynced =
                backupRealm.where("LastSynced").findFirst();
        Long lastSuccessfulSyncTime =
                lastSuccessfulSynced.getLong("timestamp");

        // Migrate unsynced changes: move data from the backup
        // instance of the realm to the new "fresh" instance fetched from the backend.
        // This includes:
        // - copying any objects that updated, but didn't sync from the
        // backup realm to the new realm.
        // - re-deleting any objects that were deleted locally while we were offline

        // Insert any unsynced updated objects to the new realm
        // NOTE: this will overwrite any changes made by other clients
        // to those objects since the last sync.
        // Applications that require finer-grained conflict resolution
        // should use custom logic instead.
        // This example keeps track of when the object last updated by also writing
        // to a "lastUpdated" field on write operations.
        RealmQuery<DynamicRealmObject> potatoQuery =
                backupRealm.where("Potato")
                        .greaterThan("lastUpdated", lastSuccessfulSyncTime);
        RealmQuery<DynamicRealmObject> onionQuery =
                backupRealm.where("Onion")
                        .greaterThan("lastUpdated", lastSuccessfulSyncTime);
        RealmQuery<DynamicRealmObject> riceQuery =
                backupRealm.where("Rice")
                        .greaterThan("lastUpdated", lastSuccessfulSyncTime);

        // insert the backup version of all unsynced object updates + creates into the new realm
        // NOTE: this process will overwrite writes from other clients, potentially overwriting
        // data in fields not modified in the backup realm. Use with caution. If this does not
        // meet your application's needs, consider keeping track of the last write for each
        // field individually (and recovering them individually, per-field).
        for(DynamicRealmObject potato : potatoQuery.findAll()) {
            Log.w("EXAMPLE", "Inserting: " + potato.getString("species"));
            newRealm.executeTransaction(transactionRealm ->
                    transactionRealm.insertOrUpdate(new Potato(potato)));
        }
        for(DynamicRealmObject onion : onionQuery.findAll()) {
            Log.w("EXAMPLE", "Inserting: " + onion.getString("varietal"));
            newRealm.executeTransaction(transactionRealm ->
                    transactionRealm.insertOrUpdate(new Onion(onion)));
        }
        for(DynamicRealmObject rice : riceQuery.findAll()) {
            Log.w("EXAMPLE", "Inserting: " + rice.getString("style"));
            newRealm.executeTransaction(transactionRealm ->
                    transactionRealm.insertOrUpdate(new Rice(rice)));
        }

        // re-delete unsynced deletions from the new realm
        // caveat: if an object has been updated SINCE the last update from this client,
        // (from another client) this does not delete that object. This doesn't match
        // realm's usual "deletes always win" behavior but it isn't possible to
        // distinguish between:
        // - objects that were deleted from this client after the last sync
        // - objects that were created by another client after the last sync
        // So instead of deleting innocent objects created by other clients, we let
        // other client updates "win" in this case.
        // This means that previously deleted (but unsynced) objects could reappear on this
        // client after the client reset event.

        // get all the ids of objects that haven't been updated since the last client sync
        // (anything that's been updated since the last sync should not be deleted)
        // -- could be new object, or an object this client deleted but another client modified
        Set<ObjectId> allNewPotatoIds = newRealm.where(Potato.class)
                .lessThan("lastUpdated", lastSuccessfulSyncTime)
                .findAll().stream().map(Potato::getId).collect(Collectors.toSet());
        Set<ObjectId> allNewOnionIds = newRealm.where(Onion.class)
                .lessThan("lastUpdated", lastSuccessfulSyncTime)
                .findAll().stream().map(Onion::getId).collect(Collectors.toSet());
        Set<ObjectId> allNewRiceIds = newRealm.where(Rice.class)
                .lessThan("lastUpdated", lastSuccessfulSyncTime)
                .findAll().stream().map(Rice::getId).collect(Collectors.toSet());

        Log.v("EXAMPLE", "number of potatoes in fresh realm" +
                "that have not been updated since last sync: " + allNewPotatoIds.size());
        Log.v("EXAMPLE", "number of onions in fresh realm" +
                "that have not been updated since last sync: " + allNewOnionIds.size());
        Log.v("EXAMPLE", "number of rices in fresh realm" +
                "that have not been updated since last sync: " + allNewRiceIds.size());

        // get all the ids of objects in the backup realm
        Set<ObjectId> allOldPotatoIds = backupRealm.where("Potato")
                .findAll().stream().map(obj -> obj.getObjectId("_id"))
                .collect(Collectors.toSet());
        Set<ObjectId> allOldOnionIds = backupRealm.where("Onion")
                .findAll().stream().map(obj -> obj.getObjectId("_id"))
                .collect(Collectors.toSet());
        Set<ObjectId> allOldRiceIds = backupRealm.where("Rice")
                .findAll().stream().map(obj -> obj.getObjectId("_id"))
                .collect(Collectors.toSet());

        Log.v("EXAMPLE", "number of potatoes in the old realm: " +
                allOldPotatoIds.size());
        Log.v("EXAMPLE", "number of onions in the old realm: " +
                allOldOnionIds.size());
        Log.v("EXAMPLE", "number of rices in the old realm: " +
                allOldRiceIds.size());

        // Get the set of:
        // all objects in the new realm
        // - that have not been updated since last sync
        // - that are not in the backup realm
        // Those objects were deleted from the backup realm sometime after the last sync.
        Set<ObjectId> unsyncedPotatoDeletions = allNewPotatoIds.stream()
                .filter(((Predicate<ObjectId>)(allOldPotatoIds::contains)).negate())
                .collect(Collectors.toSet());
        Set<ObjectId> unsyncedOnionDeletions = allNewOnionIds.stream()
                .filter(((Predicate<ObjectId>)(allOldOnionIds::contains)).negate())
                .collect(Collectors.toSet());
        Set<ObjectId> unsyncedRiceDeletions = allNewRiceIds.stream()
                .filter(((Predicate<ObjectId>)(allOldRiceIds::contains)).negate())
                .collect(Collectors.toSet());

        Log.v("EXAMPLE", "Number of potatos to re-delete: "
                + unsyncedPotatoDeletions.size());
        Log.v("EXAMPLE", "Number of onions to re-delete: "
                + unsyncedOnionDeletions.size());
        Log.v("EXAMPLE", "Number of rices to re-delete: "
                + unsyncedRiceDeletions.size());

        // perform "re-deletions"
        for(ObjectId id: unsyncedPotatoDeletions) {
            Log.w("EXAMPLE", "Deleting " + unsyncedPotatoDeletions.size()
                    + " potato objects.");
            newRealm.executeTransaction(transactionRealm -> {
                transactionRealm.where(Potato.class).equalTo("_id", id)
                        .findAll().deleteAllFromRealm();
            });
        }

        for(ObjectId id: unsyncedOnionDeletions) {
            Log.w("EXAMPLE", "Deleting " + unsyncedOnionDeletions.size()
                    + " onion objects.");
            newRealm.executeTransaction(transactionRealm -> {
                transactionRealm.where(Onion.class).equalTo("_id", id)
                        .findAll().deleteAllFromRealm();
            });
        }

        for(ObjectId id: unsyncedRiceDeletions) {
            Log.w("EXAMPLE", "Deleting " + unsyncedRiceDeletions.size()
                    + " rice objects.");
            newRealm.executeTransaction(transactionRealm -> {
                transactionRealm.where(Rice.class).equalTo("_id", id)
                        .findAll().deleteAllFromRealm();
            });
        }

        // Output the state of the freshly downloaded realm, after recovering local data.
        Log.v("EXAMPLE", "Number of potato objects in the new realm: "
                + newRealm.where(Potato.class).findAll().size());
        Log.v("EXAMPLE", "Number of onion objects in the new realm: "
                + newRealm.where(Onion.class).findAll().size());
        Log.v("EXAMPLE", "Number of rice objects in the new realm: "
                + newRealm.where(Rice.class).findAll().size());

        // close the realms
        backupRealm.close();
        newRealm.close();
    });

    // execute the recovery logic on a background thread
    try {
        executor.awaitTermination(20000, TimeUnit.MILLISECONDS);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
