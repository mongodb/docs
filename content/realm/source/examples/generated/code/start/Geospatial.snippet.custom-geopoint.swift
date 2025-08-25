class CustomGeoPoint: EmbeddedObject {
    @Persisted private var type: String = "Point"
    @Persisted private var coordinates: List<Double>

    public var latitude: Double { return coordinates[1] }
    public var longitude: Double { return coordinates[0] }

    convenience init(_ latitude: Double, _ longitude: Double) {
        self.init()
        // Longitude comes first in the coordinates array of a GeoJson document
        coordinates.append(objectsIn: [longitude, latitude])
    }
}
