// Dog.h
@interface Dog : RLMObject
@property NSString *name;
// No backlink to person -- one-directional relationship
@end

// Define an RLMArray<Dog> type
RLM_COLLECTION_TYPE(Dog)

// Person.h
@interface Person : RLMObject
@property NSString *name;
// A person can have one dog
@property Dog *dog;
@end


// Dog.m
@implementation Dog
@end

// Person.m
@implementation Person
@end
