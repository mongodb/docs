// use a "last synced" singleton in the realm to keep track of when the
// realm last successfully completed a sync
app.sync.getSession(config)
    .addUploadProgressListener(ProgressMode.INDEFINITELY) { progress: Progress ->
        // get the last synced time. Create an instance if it does not already exist.
        val notificationRealm = Realm.getInstance(config)
        val lastSynced =
            notificationRealm.where(LastSynced::class.java).findFirst()
        if (lastSynced == null) {
            notificationRealm.executeTransaction { transactionRealm: Realm ->
                transactionRealm.createObject(
                    LastSynced::class.java,
                    ObjectId()
                ).timestamp = System.currentTimeMillis()
            }
        }

        // only update the "last synced" time when ALL client data has uploaded
        // avoid repeatedly setting "last synced" every time we update "last synced"
        // by checking if the current "last synced" time was within the last 10ms
        if (progress.isTransferComplete &&
            System.currentTimeMillis() > lastSynced?.timestamp?.plus(10) ?: 0
        ) {
            notificationRealm.executeTransaction { transactionRealm: Realm ->
                transactionRealm.where(LastSynced::class.java)
                    .findFirst()
                    ?.timestamp = System.currentTimeMillis()
                Log.v(
                    "EXAMPLE", "Updating last synced time to: "
                            + System.currentTimeMillis()
                )
            }
            Log.v(
                "EXAMPLE", "Updated last synced time to: " +
                        lastSynced!!.timestamp
            )
        }
        notificationRealm.close()
    }
