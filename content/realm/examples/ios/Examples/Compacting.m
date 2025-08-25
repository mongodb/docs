#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"

@interface CompactingObjc : XCTestCase

@end

@implementation CompactingObjc

- (void)testCompacting {
    // :snippet-start: compacting
    RLMRealmConfiguration *config = [RLMRealmConfiguration defaultConfiguration];
    config.shouldCompactOnLaunch = ^BOOL(NSUInteger totalBytes, NSUInteger usedBytes) {
        // totalBytes refers to the size of the file on disk in bytes (data + free space)
        // usedBytes refers to the number of bytes used by data in the file

        // Compact if the file is over 100MB in size and less than 50% 'used'
        NSUInteger oneHundredMB = 100 * 1024 * 1024;
        return (totalBytes > oneHundredMB) && ((double)usedBytes / totalBytes) < 0.5;
    };

    NSError *error = nil;
    // Realm is compacted on the first open if the configuration block conditions were met.
    RLMRealm *realm = [RLMRealm realmWithConfiguration:config error:&error];
    if (error) {
        // handle error compacting or opening Realm
    }
    // :snippet-end:
}

@end
