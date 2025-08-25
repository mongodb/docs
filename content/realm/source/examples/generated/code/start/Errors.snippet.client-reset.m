RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
[[app syncManager] setErrorHandler:^(NSError *error, RLMSyncSession *session) {
    if (error.code == RLMSyncErrorClientResetError) {
        // TODO: Invalidate all open realm instances
        // TODO: Restore the local changes backed up at [error rlmSync_clientResetBackedUpRealmPath]
        [RLMSyncSession immediatelyHandleError:[error rlmSync_errorActionToken] syncManager:[app syncManager]];
        return;
    }
    // Handle other errors...
}];
