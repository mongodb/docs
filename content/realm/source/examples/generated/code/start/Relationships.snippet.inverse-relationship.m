// Task.h
@interface Task : RLMObject
@property NSString *description;
@property (readonly) RLMLinkingObjects *assignees;
@end

// Define an RLMArray<Task> type
RLM_COLLECTION_TYPE(Task)


// User.h
@interface User : RLMObject
@property NSString *name;
@property RLMArray<Task *><Task> *tasks;
@end


// Task.m
@implementation Task
+ (NSDictionary *)linkingObjectsProperties {
    return @{
        @"assignees": [RLMPropertyDescriptor descriptorWithClass:User.class propertyName:@"tasks"],
    };
}
@end


// User.m
@implementation User
@end

