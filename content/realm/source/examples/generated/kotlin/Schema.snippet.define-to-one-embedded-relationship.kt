// To-one embedded relationships must be of EmbeddedRealmObject type
class Contact : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Property of EmbeddedRealmObject type (MUST be null)
    var address: EmbeddedAddress? = null
}

class EmbeddedAddress : EmbeddedRealmObject {
    var propertyOwner: Contact? = null
    var street: String? = ""
    // Embed another EmbeddedRealmObject type
    var country: EmbeddedCountry? = null
}

class EmbeddedCountry : EmbeddedRealmObject {
    var name: String = ""
}
