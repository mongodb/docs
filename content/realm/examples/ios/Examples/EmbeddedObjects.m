// :replace-start: {
//   "terms": {
//     "EmbeddedObjectObjcExamples_": ""
//   }
// }
#import <XCTest/XCTest.h>
#import <Realm/Realm.h>

// :snippet-start: models
// Define an embedded object
@interface EmbeddedObjectObjcExamples_Address : RLMEmbeddedObject
@property NSString *street;
@property NSString *city;
@property NSString *country;
@property NSString *postalCode;
@end

// Enable EmbeddedObjectObjcExamples_Address for use in RLMArray
RLM_COLLECTION_TYPE(EmbeddedObjectObjcExamples_Address)


@implementation EmbeddedObjectObjcExamples_Address
@end

// Define an object with one embedded object
@interface EmbeddedObjectObjcExamples_Contact : RLMObject
@property NSString *name;

// Embed a single object.
@property EmbeddedObjectObjcExamples_Address *address;
@end

@implementation EmbeddedObjectObjcExamples_Contact
@end

// Define an object with an array of embedded objects
@interface EmbeddedObjectObjcExamples_Business : RLMObject
@property NSString *name;
// Embed an array of objects
@property RLMArray<EmbeddedObjectObjcExamples_Address *><EmbeddedObjectObjcExamples_Address> *addresses;
@end

// :snippet-end:

@interface EmbeddedObjectsObjc : XCTestCase
@end

@implementation EmbeddedObjectsObjc
@end


// :replace-end:
