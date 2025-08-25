#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"
#import "AnonymouslyLoggedInTestCase.h"

@implementation AnonymouslyLoggedInTestCase

- (void)setUp {
    XCTestExpectation *expectation = [self expectationWithDescription:@"logs in"];

    RLMApp *app = [MyRealmApp app];
    [app loginWithCredential:[RLMCredentials anonymousCredentials] completion:^(RLMUser *user, NSError *error) {
        NSAssert(error == nil, @"Failed to log in: %@", [error localizedDescription]);
        [expectation fulfill];
    }];

    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

- (void)tearDown {
    XCTestExpectation *expectation = [self expectationWithDescription:@"logs in"];

    // Use the app
    RLMApp *app = [MyRealmApp app];
    [[app currentUser] removeWithCompletion:^(NSError *error) {
        NSAssert(error == nil, @"Failed to remove user: %@", [error localizedDescription]);
        [expectation fulfill];
    }];

    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

@end
