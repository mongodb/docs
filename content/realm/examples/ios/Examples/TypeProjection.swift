// :replace-start: {
//   "terms": {
//     "TypeProjection_": ""
//   }
// }

import XCTest
import RealmSwift
import CoreLocation

// :snippet-start: custom-persistable-protocols
// Extend a type as a CustomPersistable if if is impossible for
// conversion between the mapped type and the persisted type to fail.
extension CLLocationCoordinate2D: CustomPersistable {
    // :remove-start:
    // This code resolves this error: Extension outside of file declaring struct 'CLLocationCoordinate2D' prevents automatic synthesis of '==' for protocol 'Equatable'
    // It is hidden because it's not a part of the custom type mapping implementation so I didn't want to confuse readers about what is required to use custom type mapping
    public static func == (lhs: CLLocationCoordinate2D, rhs: CLLocationCoordinate2D) -> Bool {
        lhs.latitude == rhs.latitude && lhs.longitude == rhs.longitude
    }
    // :remove-end:
    // Define the storage object that is persisted to the database.
    // The `PersistedType` must be a type that Realm supports.
    // In this example, the PersistedType is an embedded object.
    public typealias PersistedType = Location
    // Construct an instance of the mapped type from the persisted type.
    // When reading from the database, this converts the persisted type to the mapped type.
    public init(persistedValue: PersistedType) {
        self.init(latitude: persistedValue.latitude, longitude: persistedValue.longitude)
    }
    // Construct an instance of the persisted type from the mapped type.
    // When writing to the database, this converts the mapped type to a persistable type.
    public var persistableValue: PersistedType {
        Location(value: [self.latitude, self.longitude])
    }
}

// Extend a type as a FailableCustomPersistable if it is possible for
// conversion between the mapped type and the persisted type to fail.
// This returns nil on read if the underlying column contains nil or
// something that can't be converted to the specified type.
extension URL: FailableCustomPersistable {
    // Define the storage object that is persisted to the database.
    // The `PersistedType` must be a type that Realm supports.
    public typealias PersistedType = String
    // Construct an instance of the mapped type from the persisted type.
    // When reading from the database, this converts the persisted type to the mapped type.
    // This must be a failable initilizer when the conversion may fail.
    public init?(persistedValue: String) { self.init(string: persistedValue) }
    // Construct an instance of the persisted type from the mapped type.
    // When writing to the database, this converts the mapped type to a persistable type.
    public var persistableValue: String { self.absoluteString }
}
// :snippet-end:

// :snippet-start: use-type-projection-in-objects
class TypeProjection_Club: Object {
    @Persisted var id: ObjectId
    @Persisted var name: String
    // Since we declared the URL as a FailableCustomPersistable,
    // it must be optional.
    @Persisted var url: URL?
    // Here, the `location` property maps to an embedded object.
    // We can declare the property as required.
    // If the underlying field contains nil, this becomes
    // a default-constructed instance of CLLocationCoordinate
    // with field values of `0`.
    @Persisted var location: CLLocationCoordinate2D
}

public class Location: EmbeddedObject {
    @Persisted var latitude: Double
    @Persisted var longitude: Double
}
// :snippet-end:

class TypeProjection: XCTestCase {

    func testExample() {
        let realm = try! Realm()

        // :snippet-start: create-objects-with-type-projection
        // Initialize objects and assign values
        let club = TypeProjection_Club(value: ["name": "American Kennel Club", "url": "https://akc.org"])
        let club2 = TypeProjection_Club()
        club2.name = "Continental Kennel Club"
        // When assigning the value to a type-projected property, type safety
        // checks for the mapped type - not the persisted type.
        club2.url = URL(string: "https://ckcusa.com/")!
        club2.location = CLLocationCoordinate2D(latitude: 40.7509, longitude: 73.9777)
        // :snippet-end:

        try! realm.write {
            realm.add(club)
            realm.add(club2)
        }

        // :snippet-start: query-objects-with-type-projection
        let akcClub = realm.objects(TypeProjection_Club.self).where {
            $0.name == "American Kennel Club"
        }.first!
        // You can use type-safe expressions to check for equality
        XCTAssert(akcClub.url == URL(string: "https://akc.org")!)

        let clubs = realm.objects(TypeProjection_Club.self)
        // You can use the persisted property type in NSPredicate query expressions
        let akcByUrl = clubs.filter("url == 'https://akc.org'").first!
        XCTAssert(akcByUrl.name == "American Kennel Club")
        // :snippet-end:

        try! realm.write {
            realm.deleteAll()
        }
    }
}
// :replace-end:
