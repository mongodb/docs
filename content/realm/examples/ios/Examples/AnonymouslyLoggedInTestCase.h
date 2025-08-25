#ifndef AnonymouslyLoggedInTestCase_h
#define AnonymouslyLoggedInTestCase_h

#import <XCTest/XCTest.h>

// Derive from this class whenever you need to use
// [app currentUser] with an existing anonymous login.
@interface AnonymouslyLoggedInTestCase : XCTestCase

@end

#endif /* AnonymouslyLoggedInTestCase_h */
