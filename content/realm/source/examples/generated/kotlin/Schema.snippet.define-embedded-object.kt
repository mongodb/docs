// Implements `EmbeddedRealmObject` interface
class EmbeddedAddress : EmbeddedRealmObject {
    // CANNOT have primary key
    var street: String? = null
    var city: String? = null
    var state: String? = null
    var postalCode: String? = null
    var propertyOwner: Contact? = null
}
