// Define the enum
enum TaskStatusEnum: String, PersistableEnum {
    case notStarted
    case inProgress
    case complete
}

// To use the enum:
class Task: Object {
    @Persisted var name: String = ""
    @Persisted var owner: String?

    // Required enum property
    @Persisted var status = TaskStatusEnum.notStarted 

    // Optional enum property
    @Persisted var optionalTaskStatusEnumProperty: TaskStatusEnum? 
}
