class CustomGeoPoint : EmbeddedRealmObject {
    constructor(latitude: Double, longitude: Double) {
        coordinates.apply {
            add(longitude)
            add(latitude)
        }
    }
    // Empty constructor required by Realm
    constructor() : this(0.0, 0.0)

    // Name and type required by Realm
    var coordinates: RealmList<Double> = realmListOf()

    // Name, type, and value required by Realm
    private var type: String = "Point"

    @Ignore
    var latitude: Double
        get() = coordinates[1]
        set(value) {
            coordinates[1] = value
        }

    @Ignore
    var longitude: Double
        get() = coordinates[0]
        set(value) {
            coordinates[0] = value
        }
}
