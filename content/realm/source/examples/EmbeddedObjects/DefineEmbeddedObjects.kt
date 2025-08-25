// Define an embedded object
@RealmClass(embedded = true)
open class Address(
    var street: String? = null,
    var city: String? = null,
    var country: String? = null,
    var postalCode: String? = null
): RealmObject() {}

// Define an object containing one embedded object
open class Contact(_name: String = "", _address: Address? = null) : RealmObject() {
    @PrimaryKey var _id: ObjectId = ObjectId()
    var name: String = _name
    
    // Embed a single object.
    // Embedded object properties must be marked optional
    var address: Address? = _address
}

// Define an object containing an array of embedded objects
open class Business(_name: String = "", _addresses: RealmList<Address> = RealmList()) : RealmObject() {
    @PrimaryKey var _id: ObjectId = ObjectId()
    var name: String = _name
    
    // Embed an array of objects
    var addresses: RealmList<Address> = _addresses
}
