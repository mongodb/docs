// Task.h
@interface Task : RLMObject
@property NSString *description;
@end

// Define an RLMArray<Task> type
RLM_COLLECTION_TYPE(Task)


// User.h
// #include "Task.h"
@interface User : RLMObject
@property NSString *name;
// Use RLMArray<Task> to have a list of tasks
// Note the required double tag (<Task *><Task>)
@property RLMArray<Task *><Task> *tasks;
@end
