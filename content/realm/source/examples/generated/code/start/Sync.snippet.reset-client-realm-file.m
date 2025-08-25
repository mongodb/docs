@autoreleasepool {
    // all Realm usage here -- explicitly guarantee
    // that all realm objects are deallocated
    // before deleting the files
}

// Get configuration
RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
RLMUser *user = [app currentUser];
RLMRealmConfiguration *configuration = [user configurationWithPartitionValue:@"some partition value"];
configuration.objectClasses = @[Task.class];

NSError *error = nil;

// Delete realm files for that configuration
[RLMRealm deleteFilesForConfiguration:configuration
                                error:&error];
if (error) {
    // Handle error
}
