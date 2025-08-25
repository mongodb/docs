// :replace-start: {
//   "terms": {
//     "SwiftUI_": ""
//   }
// }
import RealmSwift
import Foundation

// :snippet-start: objects
class SwiftUI_Person: Object, ObjectKeyIdentifiable {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    @Persisted var personId = ""
    @Persisted var company = "MongoDB"
    @Persisted var businessUnit = BusinessUnitEnum.engineering
    @Persisted var profileImageUrl: URL?
    @Persisted var dogs: List<SwiftUI_Dog>
}

enum BusinessUnitEnum: String, PersistableEnum, CaseIterable {
    case customerEngineering = "Customer Engineering"
    case educationCommunityAndDocs = "Education, Community and Docs"
    case engineering = "Engineering"
    case financeAndOperations = "Finance and Operations"
    case humanResourcesAndRescruiting = "Human Resources and Recruiting"
    case management = "Management"
    case marketing = "Marketing"
    case product = "Product"
    case sales = "Sales"
}

class SwiftUI_Dog: Object, ObjectKeyIdentifiable {
    @Persisted(primaryKey: true) var _id: UUID
    @Persisted var name = ""
    @Persisted var breed = ""
    @Persisted var weight = 0
    @Persisted var favoriteToy = ""
    @Persisted var profileImageUrl: URL?
    @Persisted var dateLastUpdated = Date()
    @Persisted(originProperty: "dogs") var person: LinkingObjects<SwiftUI_Person>
    // :snippet-start: computed-var-sectioned-results
    var firstLetter: String {
        guard let char = name.first else {
            return ""
        }
        return String(char)
    }
    // :snippet-end:
}
// :snippet-end:

extension URL: FailableCustomPersistable {
    public typealias PersistedType = String
    public init?(persistedValue: String) { self.init(string: persistedValue) }
    public var persistableValue: String { self.absoluteString }
}

// :snippet-start: projection
class Profile: Projection<SwiftUI_Person> {
    @Projected(\SwiftUI_Person.firstName) var firstName // Passthrough from original object
    @Projected(\SwiftUI_Person.lastName.localizedCapitalized.first) var lastNameInitial // Access and transform the original property
    @Projected(\SwiftUI_Person.personId) var personId
    @Projected(\SwiftUI_Person.businessUnit) var businessUnit
    @Projected(\SwiftUI_Person.profileImageUrl) var profileImageUrl
    @Projected(\SwiftUI_Person.dogs) var dogs
}
// :snippet-end:

// :snippet-start: preview-extend-model-class-with-objects
extension SwiftUI_Dog {
    static let dog1 = SwiftUI_Dog(value: ["name": "Lita", "breed": "Lab mix", "weight": 27, "favoriteToy": "Squeaky duck", "profileImageUrl": "https://www.corporaterunaways.com/images/2021/04/lita-768x768.jpeg"])
    static let dog2 = SwiftUI_Dog(value: ["name": "Maui", "breed": "English Springer Spaniel", "weight": 42, "favoriteToy": "Wubba", "profileImageUrl": "https://www.corporaterunaways.com/images/2021/04/maui_with_leaf-768x576.jpeg"])
    static let dog3 = SwiftUI_Dog(value: ["name": "Ben", "breed": "Border Collie mix", "weight": 48, "favoriteToy": "Frisbee", "profileImageUrl": "https://www.corporaterunaways.com/images/2012/03/ben-630x420.jpg"])
    
    // :remove-start:
    static var previewRealmJustDogs: Realm {
        var realm: Realm
        let identifier = "previewRealm"
        let config = Realm.Configuration(inMemoryIdentifier: identifier)
        do {
            realm = try Realm(configuration: config)
            // Check to see whether the in-memory realm already contains Dogs.
            // If it does, we'll just return the existing realm.
            // If it doesn't, we'll add Dogs.
            let realmObjects = realm.objects(SwiftUI_Dog.self)
            if realmObjects.count == 3 {
                return realm
            } else {
                try realm.write {
                    realm.add([SwiftUI_Dog.dog1, SwiftUI_Dog.dog2, SwiftUI_Dog.dog3])
                }
                return realm
            }
        } catch let error {
            fatalError("Can't bootstrap item data: \(error.localizedDescription)")
        }
    }
    // :remove-end:
}
// :snippet-end:

extension SwiftUI_Person {
    static let person = SwiftUI_Person(value: ["firstName": "Dachary", "lastName": "Carey", "personId": "some-person-id", "profileImageUrl": "https://avatars.githubusercontent.com/u/1308377?v=4"])
    
    // :snippet-start: extend-model-class-with-realm
    static var previewRealm: Realm {
        var realm: Realm
        let identifier = "previewRealm"
        let config = Realm.Configuration(inMemoryIdentifier: identifier)
        do {
            realm = try Realm(configuration: config)
            // Check to see whether the in-memory realm already contains a Person.
            // If it does, we'll just return the existing realm.
            // If it doesn't, we'll add a Person append the Dogs.
            let realmObjects = realm.objects(SwiftUI_Person.self)
            if realmObjects.count == 1 {
                return realm
            } else {
                try realm.write {
                    realm.add(person)
                    person.dogs.append(objectsIn: [SwiftUI_Dog.dog1, SwiftUI_Dog.dog2, SwiftUI_Dog.dog3])
                }
                return realm
            }
        } catch let error {
            fatalError("Can't bootstrap item data: \(error.localizedDescription)")
        }
    }
    // :snippet-end:
    
    static var previewRealmNoDogs: Realm {
        var realm: Realm
        let identifier = "previewRealm"
        let config = Realm.Configuration(inMemoryIdentifier: identifier)
        do {
            realm = try Realm(configuration: config)
            // Check to see whether the in-memory realm already contains a Person.
            // If it does, we'll just return the existing realm.
            // If it doesn't, we'll add a Person.
            let realmObjects = realm.objects(SwiftUI_Person.self)
            if realmObjects.count == 1 {
                return realm
            } else {
                try realm.write {
                    realm.add(person)
                }
                return realm
            }
        } catch let error {
            fatalError("Can't bootstrap item data: \(error.localizedDescription)")
        }
    }
}

/// Random adjectives for more interesting demo item names
let randomAdjectives = [
    "fluffy", "classy", "bumpy", "bizarre", "wiggly", "quick", "sudden",
    "acoustic", "smiling", "dispensable", "foreign", "shaky", "purple", "keen",
    "aberrant", "disastrous", "vague", "squealing", "ad hoc", "sweet"
]

/// Random noun for more interesting demo item names
let randomNouns = [
    "floor", "monitor", "hair tie", "puddle", "hair brush", "bread",
    "cinder block", "glass", "ring", "twister", "coasters", "fridge",
    "toe ring", "bracelet", "cabinet", "nail file", "plate", "lace",
    "cork", "mouse pad"
]

/// An individual item. Part of a `ItemGroup`.
final class Item: Object, ObjectKeyIdentifiable {
    /// The unique ID of the Item. `primaryKey: true` declares the
    /// _id member as the primary key to the realm.
    @Persisted(primaryKey: true) var _id: ObjectId

    /// The name of the Item, By default, a random name is generated.
    @Persisted var name = "\(randomAdjectives.randomElement()!) \(randomNouns.randomElement()!)"

    /// A flag indicating whether the user "favorited" the item.
    @Persisted var isFavorite = false

    /// The backlink to the `ItemGroup` this item is a part of.
    @Persisted(originProperty: "items") var itemGroup: LinkingObjects<ItemGroup>
}

/// Represents a collection of items.
final class ItemGroup: Object, ObjectKeyIdentifiable {
    /// The unique ID of the ItemGroup. `primaryKey: true` declares the
    /// _id member as the primary key to the realm.
    @Persisted(primaryKey: true) var _id: ObjectId

    /// The collection of Items in this itemGroup.
    @Persisted var items = RealmSwift.List<Item>()
}

extension Item {
    static let item1 = Item(value: ["name": "fluffy coasters", "isFavorite": false, "ownerId": "previewRealm"])
    static let item2 = Item(value: ["name": "sudden cinder block", "isFavorite": true, "ownerId": "previewRealm"])
    static let item3 = Item(value: ["name": "classy mouse pad", "isFavorite": false, "ownerId": "previewRealm"])
}

extension ItemGroup {
    static let itemGroup = ItemGroup(value: ["ownerId": "previewRealm"])
    
    static var previewRealm: Realm {
        var realm: Realm
        let identifier = "previewRealm"
        let config = Realm.Configuration(inMemoryIdentifier: identifier)
        do {
            realm = try Realm(configuration: config)
            // Check to see whether the in-memory realm already contains an ItemGroup.
            // If it does, we'll just return the existing realm.
            // If it doesn't, we'll add an ItemGroup and append the Items.
            let realmObjects = realm.objects(ItemGroup.self)
            if realmObjects.count == 1 {
                return realm
            } else {
                try realm.write {
                    realm.add(itemGroup)
                    itemGroup.items.append(objectsIn: [Item.item1, Item.item2, Item.item3])
                }
                return realm
            }
        } catch let error {
            fatalError("Can't bootstrap item data: \(error.localizedDescription)")
        }
    }
}
// :replace-end:
