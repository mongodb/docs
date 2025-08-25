// Access your app
RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];

// Access the sync manager for the app
RLMSyncManager *syncManager = [app syncManager];

// Set the logger to provide debug logs
syncManager.logLevel = RLMSyncLogLevelDebug;
