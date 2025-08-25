RLMSyncSession *syncSession = [syncedRealm syncSession];
RLMProgressNotificationToken *token = [syncSession
                                       addSyncProgressNotificationForDirection:RLMSyncProgressDirectionUpload
                                      mode:RLMSyncProgressModeForCurrentlyOutstandingWork
                                     block:^(RLMSyncProgress syncProgress) {
    NSLog(@"Uploaded %fB", (double)syncProgress.progressEstimate);
}];

// Upload something
[syncedRealm transactionWithBlock:^{
    [syncedRealm addObject:[[Task alloc] init]];
}];
