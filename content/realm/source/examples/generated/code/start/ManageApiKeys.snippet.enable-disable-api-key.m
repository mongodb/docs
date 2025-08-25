RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
// ... log in ...
RLMUser *user = [app currentUser];
RLMAPIKeyAuth *client = [user apiKeysAuth];

// Enable the API key with specific objectId
RLMObjectId *objectId = [[RLMObjectId alloc] initWithString:@"00112233445566778899aabb" error:nil];
[client enableAPIKey:objectId completion:^(NSError *error) {
   // Handle error if any. Otherwise, enable was successful.
}];

RLMUserAPIKey *apiKey;

// ... Get an API key ...

// Disable the API key
[client disableAPIKey:[apiKey objectId] completion:^(NSError *error) {
   // Handle error if any. Otherwise, disable was successful.
}];
