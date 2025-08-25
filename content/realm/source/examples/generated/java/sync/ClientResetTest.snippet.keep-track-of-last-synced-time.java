// use a "last synced" singleton in the realm to keep track of when the
// realm last successfully completed a sync
app.getSync().getSession(config)
    .addUploadProgressListener(ProgressMode.INDEFINITELY, progress -> {
        // get the last synced time. Create an instance if it does not already exist.
        Realm notificationRealm = Realm.getInstance(config);
        LastSynced lastSynced =
                notificationRealm.where(LastSynced.class).findFirst();
        if (lastSynced == null) {
            notificationRealm.executeTransaction(transactionRealm ->
                    transactionRealm.createObject(LastSynced.class,
                            new ObjectId()).setTimestamp(System.currentTimeMillis()));
        }

        // only update the "last synced" time when ALL client data has uploaded
        // avoid repeatedly setting "last synced" every time we update "last synced"
        // by checking if the current "last synced" time was within the last 10ms
        if(progress.isTransferComplete() &&
                System.currentTimeMillis() > lastSynced.getTimestamp() + 10) {
            notificationRealm.executeTransaction(transactionRealm -> {
                transactionRealm.where(LastSynced.class)
                                .findFirst()
                                .setTimestamp(System.currentTimeMillis());
                Log.v("EXAMPLE", "Updating last synced time to: "
                        + System.currentTimeMillis());
            });
            Log.v("EXAMPLE", "Updated last synced time to: " +
                    lastSynced.getTimestamp());
        }
        notificationRealm.close();
});
