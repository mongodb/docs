class Club: Object {
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
