RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
// ... log in ...
RLMUser *user = [app currentUser];
RLMAPIKeyAuth *client = [user apiKeysAuth];

// Create the API key
[client createAPIKeyWithName:@"someKeyName" completion:^(RLMUserAPIKey *apiKey, NSError *error) {
    if (error != nil) {
        // ... handle Error ...
    } else {
        // ... use apiKey ...
    }
}];
