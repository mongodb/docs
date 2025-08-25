RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
// ... log in ...
RLMUser *user = [app currentUser];
RLMAPIKeyAuth *client = [user apiKeysAuth];

// Fetch API key by a specific ObjectId
NSError *error = nil;
RLMObjectId *objectId = [[RLMObjectId alloc] initWithString:@"someObjectId" error:&error];
[client fetchAPIKey:objectId completion:^(RLMUserAPIKey *apiKey, NSError *error) {
   if (error != nil) {
      // ... handle error ...
   } else {
      // ... use apiKey ...
   }
}];

// Fetch all API keys
[client fetchAPIKeysWithCompletion:^(NSArray<RLMUserAPIKey *> *keys, NSError *error) {
   if (error != nil) {
      // ... handle error ...
   } else {
      for (RLMUserAPIKey *key in keys) {
            // ... use key ...
      }
   }
}];
