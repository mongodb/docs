RLMRealm *syncedRealm = [RLMRealm realmWithConfiguration:configuration error:nil];

RLMSyncSession *syncSession = [syncedRealm syncSession];
// Suspend synchronization
[syncSession suspend];

// Later, resume synchronization
[syncSession resume];
