#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"

@interface MyObject : RLMObject
@property RLMObjectId *_id;
@end

@implementation MyObject
+ (NSArray<NSString *> *)requiredProperties {
    return @[
        @"_id"
    ];
}
@end

RLM_COLLECTION_TYPE(MyObject)

@interface MyEmbeddedObject: RLMEmbeddedObject
@property RLMObjectId *_id;
@end

@implementation MyEmbeddedObject
+ (NSArray<NSString *> *)requiredProperties {
    return @[
        @"_id"
    ];
}
@end

@interface AllSupportedTypesTestObjectObjc : RLMObject
// :snippet-start: bool-required
@property BOOL boolName;
// :snippet-end:
// :snippet-start: bool-opt
@property NSNumber<RLMBool> *optBoolName;
// :snippet-end:
// :snippet-start: int-required
@property int intName;
// :snippet-end:
// :snippet-start: int-opt
@property NSNumber<RLMInt> *optIntName;
// :snippet-end:
// :snippet-start: float-required
@property float floatName;
// :snippet-end:
// :snippet-start: float-opt
@property NSNumber<RLMFloat> *optFloatName;
// :snippet-end:
// :snippet-start: double-required
@property double doubleName;
// :snippet-end:
// :snippet-start: double-opt
@property NSNumber<RLMDouble> *optDoubleName;
// :snippet-end:
// :snippet-start: string-required
@property NSString *stringName;
// :snippet-end:
// :snippet-start: string-opt
@property NSString *optStringName;
// :snippet-end:
// :snippet-start: data-required
@property NSData *dataName;
// :snippet-end:
// :snippet-start: data-opt
@property NSData *optDataName;
// :snippet-end:
// :snippet-start: date-required
@property NSDate *dateName;
// :snippet-end:
// :snippet-start: date-opt
@property NSDate *optDateName;
// :snippet-end:
// :snippet-start: decimal128-required
@property RLMDecimal128 *decimalName;
// :snippet-end:
// :snippet-start: decimal128-opt
@property RLMDecimal128 *optDecimalName;
// :snippet-end:
// :snippet-start: uuid-required
@property NSUUID *uuidName;
// :snippet-end:
// :snippet-start: uuid-opt
@property NSUUID *optUuidName;
// :snippet-end:
// :snippet-start: objectId-required
@property RLMObjectId *objectIdName;
// :snippet-end:
// :snippet-start: objectId-opt
@property RLMObjectId *optObjectIdName;
// :snippet-end:
// :snippet-start: list-required
@property RLMArray<MyObject *><MyObject> *arrayName;
// :snippet-end:
// :snippet-start: set-required
@property RLMSet<RLMString> *setName;
// :snippet-end:
// :snippet-start: dictionary-required
@property RLMDictionary<NSString *, NSString *><RLMString, RLMString> *dictionaryName;
// :snippet-end:
// :snippet-start: custom-object-opt
@property MyObject *optObjectPropertyName;
// :snippet-end:
// :snippet-start: embedded-object-opt
@property MyEmbeddedObject *optEmbeddedObjectPropertyName;
// :snippet-end:
@end

@implementation AllSupportedTypesTestObjectObjc
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"stringName", @"dataName", @"dateName", @"decimalName", @"uuidName", @"objectIdName", @"arrayName", @"setName", @"dictionaryName"];
}
@end

@interface SupportedTypesObjc : XCTestCase
@end

@implementation SupportedTypesObjc

- (void)setUp {
    // Put setup code here. This method is called before the invocation of each test method in the class.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
}

- (void)testPopulateAllPropertiesObjc {
    RLMRealmConfiguration *config = [[RLMRealmConfiguration alloc] init];
    config.inMemoryIdentifier = @"SupportedTypesObjcExample";
    NSError *error = nil;
    RLMRealm *realm = [RLMRealm realmWithConfiguration:config error:&error];
    AllSupportedTypesTestObjectObjc *allTypesTestObject = [[AllSupportedTypesTestObjectObjc alloc] init];
    
    NSDate *currentDate = [NSDate date];
    NSDate *dateFromTimeInterval = [NSDate dateWithTimeIntervalSinceNow: 240];
    NSUUID *uuid = [NSUUID UUID];
    NSUUID *optUuid = [NSUUID UUID];
    RLMObjectId *objectId = [RLMObjectId objectId];
    RLMObjectId *optObjectId = [RLMObjectId objectId];
    
    MyObject *myCustomTestObject = [[MyObject alloc] init];
    myCustomTestObject._id = [RLMObjectId objectId];
    MyEmbeddedObject *myCustomEmbeddedTestObject = [[MyEmbeddedObject alloc] init];
    myCustomEmbeddedTestObject._id = [RLMObjectId objectId];
    NSData *requiredData = [@"Hello World" dataUsingEncoding:NSUTF8StringEncoding];
    NSData *optionalData = [@"Something wicked this way comes" dataUsingEncoding:NSUTF8StringEncoding];
    RLMDecimal128 *requiredDecimal128 = [[RLMDecimal128 alloc] initWithNumber:@(7.1776)];
    RLMDecimal128 *optDecimal128 = [[RLMDecimal128 alloc] initWithNumber:@(12.1865)];
    
    allTypesTestObject.boolName = true;
    allTypesTestObject.optBoolName = false;
    allTypesTestObject.intName = 42;
    allTypesTestObject.optIntName = @12345;
    allTypesTestObject.floatName = 2.5f;
    allTypesTestObject.optFloatName = @3.1f;
    allTypesTestObject.doubleName = 3.14159;
    allTypesTestObject.optDoubleName = [[NSNumber alloc] initWithDouble:9.51413];
    allTypesTestObject.stringName = @"No frogs here";
    allTypesTestObject.optStringName = @"Only Zuul";
    allTypesTestObject.dataName = requiredData;
    allTypesTestObject.optDataName = optionalData;
    allTypesTestObject.dateName = currentDate;
    allTypesTestObject.optDateName = dateFromTimeInterval;
    allTypesTestObject.decimalName = requiredDecimal128;
    allTypesTestObject.optDecimalName = optDecimal128;
    allTypesTestObject.uuidName = uuid;
    allTypesTestObject.optUuidName = optUuid;
    allTypesTestObject.objectIdName = objectId;
    allTypesTestObject.optObjectIdName = optObjectId;
    allTypesTestObject.dictionaryName[@"Favorite espresso"] = @"Barismo";
    allTypesTestObject.optObjectPropertyName = myCustomTestObject;
    allTypesTestObject.optEmbeddedObjectPropertyName = myCustomEmbeddedTestObject;
    if (!realm) {
        NSLog(@"Error opening realm: %@", error);
    } else {
        [realm transactionWithBlock:^() {
            [realm addObject:allTypesTestObject];
            [allTypesTestObject.arrayName addObject:myCustomTestObject];
            [allTypesTestObject.setName addObject:@"Cup of tea"];
        }];
        RLMResults *queriedObjects = [AllSupportedTypesTestObjectObjc allObjectsInRealm:realm];
        XCTAssertEqual(queriedObjects.count, 1);
        AllSupportedTypesTestObjectObjc *returnedAllTypesObject = queriedObjects[0];
        XCTAssertTrue(returnedAllTypesObject.boolName);
        XCTAssertEqual(returnedAllTypesObject.optBoolName.boolValue, false);
        XCTAssertEqual(returnedAllTypesObject.intName, 42);
        XCTAssertEqual(returnedAllTypesObject.optIntName.intValue, 12345);
        XCTAssertEqual(returnedAllTypesObject.floatName, 2.5f);
        XCTAssertEqual(returnedAllTypesObject.optFloatName.floatValue, 3.1f);
        XCTAssertEqual(returnedAllTypesObject.doubleName, 3.14159);
        XCTAssertEqual(returnedAllTypesObject.optDoubleName.doubleValue, 9.51413);
        XCTAssert([returnedAllTypesObject.stringName isEqualToString:@"No frogs here"]);
        XCTAssert([returnedAllTypesObject.optStringName isEqualToString:@"Only Zuul"]);
        XCTAssert([returnedAllTypesObject.dataName isEqualToData:requiredData]);
        XCTAssert([returnedAllTypesObject.optDataName isEqualToData:optionalData]);
        // I could not figure out how to directly compare two RLMDecimal128s
        // So checking for greater than or equal to AND less than or equal to means it must be equal
        XCTAssert([returnedAllTypesObject.decimalName isGreaterThanOrEqualTo:requiredDecimal128]);
        XCTAssert([returnedAllTypesObject.decimalName isLessThanOrEqualTo:requiredDecimal128]);
        XCTAssert([returnedAllTypesObject.optDecimalName isGreaterThanOrEqualTo:optDecimal128]);
        XCTAssert([returnedAllTypesObject.optDecimalName isLessThanOrEqualTo:optDecimal128]);
        XCTAssert([returnedAllTypesObject.uuidName.UUIDString isEqualToString:uuid.UUIDString]);
        XCTAssert([returnedAllTypesObject.optUuidName.UUIDString isEqualToString:optUuid.UUIDString]);
        XCTAssert([returnedAllTypesObject.objectIdName.stringValue isEqualToString:objectId.stringValue]);
        XCTAssert([returnedAllTypesObject.optObjectIdName.stringValue isEqualToString:optObjectId.stringValue]);
        XCTAssertEqual([returnedAllTypesObject.arrayName indexOfObject:myCustomTestObject], 0);
        XCTAssert([returnedAllTypesObject.setName containsObject:@"Cup of tea"]);
        XCTAssert([returnedAllTypesObject.dictionaryName[@"Favorite espresso"] isEqualToString:@"Barismo"]);
        XCTAssert([returnedAllTypesObject.optObjectPropertyName isEqualToObject:myCustomTestObject]);
        XCTAssert([returnedAllTypesObject.optEmbeddedObjectPropertyName isEqualToObject:myCustomEmbeddedTestObject]);
    }
}

- (void)testPopulateOnlyRequiredProperties {
    RLMRealmConfiguration *config = [[RLMRealmConfiguration alloc] init];
    config.inMemoryIdentifier = @"RequiredSupportedTypesObjcExample";
    NSError *error = nil;
    RLMRealm *realm = [RLMRealm realmWithConfiguration:config error:&error];
    AllSupportedTypesTestObjectObjc *requiredTypesTestObject = [[AllSupportedTypesTestObjectObjc alloc] init];
    
    NSDate *currentDate = [NSDate date];
    NSUUID *uuid = [NSUUID UUID];
    RLMObjectId *objectId = [RLMObjectId objectId];
    
    MyObject *myCustomTestObject = [[MyObject alloc] init];
    myCustomTestObject._id = [RLMObjectId objectId];
    MyEmbeddedObject *myCustomEmbeddedTestObject = [[MyEmbeddedObject alloc] init];
    myCustomEmbeddedTestObject._id = [RLMObjectId objectId];
    NSData *requiredData = [@"Hello World" dataUsingEncoding:NSUTF8StringEncoding];
    RLMDecimal128 *requiredDecimal128 = [[RLMDecimal128 alloc] initWithNumber:@(7.1776)];
    
    requiredTypesTestObject.boolName = true;
    requiredTypesTestObject.intName = 42;
    requiredTypesTestObject.floatName = 2.5f;
    requiredTypesTestObject.doubleName = 3.14159;
    requiredTypesTestObject.stringName = @"No frogs here";
    requiredTypesTestObject.dataName = requiredData;
    requiredTypesTestObject.dateName = currentDate;
    requiredTypesTestObject.decimalName = requiredDecimal128;
    requiredTypesTestObject.uuidName = uuid;
    requiredTypesTestObject.objectIdName = objectId;
    requiredTypesTestObject.dictionaryName[@"Favorite espresso"] = @"Barismo";
    if (!realm) {
        NSLog(@"Error opening realm: %@", error);
    } else {
        [realm transactionWithBlock:^() {
            [realm addObject:requiredTypesTestObject];
            [requiredTypesTestObject.arrayName addObject:myCustomTestObject];
            [requiredTypesTestObject.setName addObject:@"Cup of tea"];
        }];
        RLMResults *queriedObjects = [AllSupportedTypesTestObjectObjc allObjectsInRealm:realm];
        XCTAssertEqual(queriedObjects.count, 1);
        AllSupportedTypesTestObjectObjc *returnedAllTypesObject = queriedObjects[0];
        XCTAssertTrue(returnedAllTypesObject.boolName);
        XCTAssertNil(returnedAllTypesObject.optBoolName);
        XCTAssertEqual(returnedAllTypesObject.intName, 42);
        XCTAssertNil(returnedAllTypesObject.optIntName);
        XCTAssertEqual(returnedAllTypesObject.floatName, 2.5f);
        XCTAssertNil(returnedAllTypesObject.optFloatName);
        XCTAssertEqual(returnedAllTypesObject.doubleName, 3.14159);
        XCTAssertNil(returnedAllTypesObject.optDoubleName);
        XCTAssert([returnedAllTypesObject.stringName isEqualToString:@"No frogs here"]);
        XCTAssertNil(returnedAllTypesObject.optStringName);
        XCTAssert([returnedAllTypesObject.dataName isEqualToData:requiredData]);
        XCTAssertNil(returnedAllTypesObject.optDataName);
        // I could not figure out how to directly compare two RLMDecimal128s
        // So checking for greater than or equal to AND less than or equal to means it must be equal
        XCTAssert([returnedAllTypesObject.decimalName isGreaterThanOrEqualTo:requiredDecimal128]);
        XCTAssert([returnedAllTypesObject.decimalName isLessThanOrEqualTo:requiredDecimal128]);
        XCTAssertNil(returnedAllTypesObject.optDecimalName);
        XCTAssert([returnedAllTypesObject.uuidName.UUIDString isEqualToString:uuid.UUIDString]);
        XCTAssertNil(returnedAllTypesObject.optUuidName);
        XCTAssert([returnedAllTypesObject.objectIdName.stringValue isEqualToString:objectId.stringValue]);
        XCTAssertNil(returnedAllTypesObject.optObjectIdName);
        XCTAssertEqual([returnedAllTypesObject.arrayName indexOfObject:myCustomTestObject], 0);
        XCTAssert([returnedAllTypesObject.setName containsObject:@"Cup of tea"]);
        XCTAssert([returnedAllTypesObject.dictionaryName[@"Favorite espresso"] isEqualToString:@"Barismo"]);
        XCTAssertNil(returnedAllTypesObject.optObjectPropertyName);
        XCTAssertNil(returnedAllTypesObject.optEmbeddedObjectPropertyName);
    }
}

@end
