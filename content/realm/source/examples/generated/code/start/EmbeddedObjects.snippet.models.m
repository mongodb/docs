// Define an embedded object
@interface Address : RLMEmbeddedObject
@property NSString *street;
@property NSString *city;
@property NSString *country;
@property NSString *postalCode;
@end

// Enable Address for use in RLMArray
RLM_COLLECTION_TYPE(Address)


@implementation Address
@end

// Define an object with one embedded object
@interface Contact : RLMObject
@property NSString *name;

// Embed a single object.
@property Address *address;
@end

@implementation Contact
@end

// Define an object with an array of embedded objects
@interface Business : RLMObject
@property NSString *name;
// Embed an array of objects
@property RLMArray<Address *><Address> *addresses;
@end

