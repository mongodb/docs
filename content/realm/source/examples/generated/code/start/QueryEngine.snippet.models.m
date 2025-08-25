// Task.h
@interface Task : RLMObject
@property NSString *name;
@property bool isComplete;
@property NSString *assignee;
@property int priority;
@property int progressMinutes;
@end
RLM_COLLECTION_TYPE(Task)
// Task.m
@implementation Task
@end

// Project.h
@interface Project : RLMObject
@property NSString *name;
@property RLMArray<Task> *tasks;
@end
// Project.m
@implementation Project
@end
