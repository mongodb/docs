RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
// ... log in ...
RLMUser *user = [app currentUser];
RLMAPIKeyAuth *client = [user apiKeysAuth];

RLMUserAPIKey *apiKey;

// ... Get an API key ...

[client deleteAPIKey:[apiKey objectId] completion:^(NSError *error) {
   // Handle error if any. Otherwise, delete was successful.
}];
