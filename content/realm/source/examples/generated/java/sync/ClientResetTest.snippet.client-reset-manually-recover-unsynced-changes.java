String appID = YOUR_APP_ID; // replace this with your App ID
final App app = new App(new AppConfiguration.Builder(appID)
    .defaultSyncClientResetStrategy(new ManuallyRecoverUnsyncedChangesStrategy() {
        @Override
        public void onClientReset(SyncSession session, ClientResetRequiredError error) {
            Log.v("EXAMPLE", "Executing manual client reset handler");
            handleManualReset(session.getUser().getApp(), session, error);
        }
    })
    .build());
