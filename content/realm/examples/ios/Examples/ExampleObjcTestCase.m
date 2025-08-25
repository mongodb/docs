#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"

// Be sure to differentiate test cases between Swift/Obj-C, or else
// the test explorer will get confused. i.e. Append "Objc" to the
// test case class name for Obj-C (compare with "ExampleTestCase" in Swift)
@interface ExampleTestCaseObjc : XCTestCase

@end

@implementation ExampleTestCaseObjc

- (void)setUp {
    // Put setup code here. This method is called before the invocation of each test method in the class.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
}

- (void)testExample {
    XCTestExpectation *expectation = [self expectationWithDescription:@"..."];

    // Use the app
    RLMApp *app = [MyRealmApp app];
    (void)app;
    
    [expectation fulfill];

    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

@end
