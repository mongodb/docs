RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
[app loginWithCredential:[RLMCredentials anonymousCredentials] completion:^(RLMUser *user, NSError *error) {
    if (error != nil) {
        NSLog(@"Failed to log in: %@", error);
        return;
    }
    RLMMongoClient *client = [user mongoClientWithServiceName:@"mongodb-atlas"];
    RLMMongoDatabase *database = [client databaseWithName:@"my_database"];
    RLMMongoCollection *collection = [database collectionWithName:@"users"];

    // Update the user's custom data document
    [collection updateOneDocumentWhere:@{@"userId": [user identifier]}
        updateDocument: @{@"favoriteColor": @"cerulean"}
        completion:^(RLMUpdateResult *updateResult, NSError *error) { 
            if (error != nil) {
                NSLog(@"Failed to insert: %@", error);
            }
            NSLog(@"Matched: %lu, modified: %lu", [updateResult matchedCount], [updateResult modifiedCount]);
    }];
}];
