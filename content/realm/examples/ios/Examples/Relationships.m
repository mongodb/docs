// :replace-start: {
//   "terms": {
//     "InverseRelationshipObjcExample_": "",
//     "ToManyObjcExample_": "",
//     "ToOneRelationshipObjc_": ""
//   }
// }
#import <XCTest/XCTest.h>
#import <Realm/Realm.h>

// :snippet-start: inverse-relationship
// InverseRelationshipObjcExample_Task.h
@interface InverseRelationshipObjcExample_Task : RLMObject
@property NSString *description;
@property (readonly) RLMLinkingObjects *assignees;
@end

// Define an RLMArray<InverseRelationshipObjcExample_Task> type
RLM_COLLECTION_TYPE(InverseRelationshipObjcExample_Task)


// InverseRelationshipObjcExample_User.h
@interface InverseRelationshipObjcExample_User : RLMObject
@property NSString *name;
@property RLMArray<InverseRelationshipObjcExample_Task *><InverseRelationshipObjcExample_Task> *tasks;
@end


// InverseRelationshipObjcExample_Task.m
@implementation InverseRelationshipObjcExample_Task
+ (NSDictionary *)linkingObjectsProperties {
    return @{
        @"assignees": [RLMPropertyDescriptor descriptorWithClass:InverseRelationshipObjcExample_User.class propertyName:@"tasks"],
    };
}
@end


// InverseRelationshipObjcExample_User.m
@implementation InverseRelationshipObjcExample_User
@end

// :snippet-end:

// :snippet-start: to-many-relationship
// ToManyObjcExample_Dog.h
@interface ToManyObjcExample_Dog : RLMObject
@property NSString *name;
// No backlink to person -- one-directional relationship
@end

// Define an RLMArray<ToManyObjcExample_Dog> type
RLM_COLLECTION_TYPE(ToManyObjcExample_Dog)

// ToManyObjcExample_Person.h
@interface ToManyObjcExample_Person : RLMObject
@property NSString *name;
// A person can have many dogs
@property RLMArray<ToManyObjcExample_Dog *><ToManyObjcExample_Dog> *dogs;
@end


// ToManyObjcExample_Dog.m
@implementation ToManyObjcExample_Dog
@end

// ToManyObjcExample_Person.m
@implementation ToManyObjcExample_Person
@end
// :snippet-end:

// :snippet-start: to-one-relationship
// ToOneRelationshipObjc_Dog.h
@interface ToOneRelationshipObjc_Dog : RLMObject
@property NSString *name;
// No backlink to person -- one-directional relationship
@end

// Define an RLMArray<ToManyObjcExample_Dog> type
RLM_COLLECTION_TYPE(ToOneRelationshipObjc_Dog)

// ToOneRelationshipObjc_Person.h
@interface ToOneRelationshipObjc_Person : RLMObject
@property NSString *name;
// A person can have one dog
@property ToOneRelationshipObjc_Dog *dog;
@end


// ToOneRelationshipObjc_Dog.m
@implementation ToOneRelationshipObjc_Dog
@end

// ToOneRelationshipObjc_Person.m
@implementation ToOneRelationshipObjc_Person
@end
// :snippet-end:

@interface RelationshipsObjc : XCTestCase
@end

@implementation RelationshipsObjc
@end

// :replace-end:
