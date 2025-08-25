RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];

// ... log in ...

RLMUser *user = [app currentUser];

// Call concatenate function
[user callFunctionNamed:@"concatenate"
              arguments:@[@"john.smith", @"@companyemail.com"]
        completionBlock:^(id<RLMBSON> result, NSError *error) {
    if (error) {
        NSLog(@"Function call failed: %@", [error localizedDescription]);
        return;
    }
    NSLog(@"Called function 'concatenate' and got result: %@", result);
    assert([result isEqual:@"john.smith@companyemail.com"]);
}];

