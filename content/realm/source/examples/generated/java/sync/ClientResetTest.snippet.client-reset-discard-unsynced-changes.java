String appID = YOUR_APP_ID; // replace this with your App ID
App app = new App(new AppConfiguration.Builder(appID)
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
                    " Falling back to manual recovery: " + error.getErrorMessage());
            handleManualReset(session.getUser().getApp(), session, error);
        }
    })
    .build());
