#import "AnonymouslyLoggedInTestCase.h"
#import "MyRealmApp.h"

@interface FunctionsObjc : AnonymouslyLoggedInTestCase
@end

@implementation FunctionsObjc
- (void)testCallFunction {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];
    // :snippet-start: call-a-function
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
        // :remove-start:
        [expectation fulfill];
        // :remove-end:
    }];

    // :snippet-end:
    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

@end
