// :replace-start: {
//   "terms": {
//     "InverseRelationshipExample_": "",
//     "InverseRelationshipObjcDynamicExample_": "",
//     "ToManyExample_": "",
//     "ToOneRelationship_": ""
//   }
// }
import Foundation
import RealmSwift

// :snippet-start: inverse-relationship
class InverseRelationshipExample_User: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var _partition: String = ""
    @Persisted var name: String = ""

    // A user can have many tasks.
    @Persisted var tasks: List<InverseRelationshipExample_Task>
}

class InverseRelationshipExample_Task: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var _partition: String = ""
    @Persisted var text: String = ""

    // Backlink to the user. This is automatically updated whenever
    // this task is added to or removed from a user's task list.
    @Persisted(originProperty: "tasks") var assignee: LinkingObjects<InverseRelationshipExample_User>
}
// :snippet-end:

// :snippet-start: inverse-relationship-objc-dynamic
class InverseRelationshipObjcDynamicExample_User: Object {
    @objc dynamic var _id: ObjectId = ObjectId.generate()
    @objc dynamic var _partition: String = ""
    @objc dynamic var name: String = ""

    // A user can have many tasks.
    let tasks = List<InverseRelationshipObjcDynamicExample_Task>()

    override static func primaryKey() -> String? {
        return "_id"
    }
}

class InverseRelationshipObjcDynamicExample_Task: Object {
    @objc dynamic var _id: ObjectId = ObjectId.generate()
    @objc dynamic var _partition: String = ""
    @objc dynamic var text: String = ""

    // Backlink to the user. This is automatically updated whenever
    // this task is added to or removed from a user's task list.
    let assignee = LinkingObjects(fromType: InverseRelationshipObjcDynamicExample_User.self, property: "tasks")

    override static func primaryKey() -> String? {
        return "_id"
    }
}
// :snippet-end:

// :snippet-start: to-many-relationship
class ToManyExample_Person: Object {
    @Persisted var name: String = ""
    @Persisted var birthdate: Date = Date(timeIntervalSince1970: 1)

    // A person can have many dogs
    @Persisted var dogs: List<ToManyExample_Dog>
}

class ToManyExample_Dog: Object {
    @Persisted var name: String = ""
    @Persisted var age: Int = 0
    @Persisted var breed: String?
    // No backlink to person -- one-directional relationship
}
// :snippet-end:

// :snippet-start: to-one-relationship
class ToOneRelationship_Person: Object {
    @Persisted var name: String = ""
    @Persisted var birthdate: Date = Date(timeIntervalSince1970: 1)

    // A person can have one dog
    @Persisted var dog: ToOneRelationship_Dog?
}

class ToOneRelationship_Dog: Object {
    @Persisted var name: String = ""
    @Persisted var age: Int = 0
    @Persisted var breed: String?
    // No backlink to person -- one-directional relationship
}
// :snippet-end:

// :replace-end:
