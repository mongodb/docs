// Define the enum
@objc enum TaskStatusEnum: Int, RealmEnum {
    case notStarted = 1
    case inProgress = 2
    case complete = 3
}

// To use the enum:
class Task: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var owner: String?

    // Required enum property
    @objc dynamic var status = TaskStatusEnum.notStarted 
    // Optional enum property
    let optionalTaskStatusEnumProperty = RealmProperty<TaskStatusEnum?>() 
}
