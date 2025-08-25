// Extend a type as a CustomPersistable if if is impossible for
// conversion between the mapped type and the persisted type to fail.
extension CLLocationCoordinate2D: CustomPersistable {
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
