// To-many embedded relationships must be a RealmList<E> or
// RealmDictionary<K, V> property of EmbeddedRealmObject type
class Business : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // List of EmbeddedRealmObject type (CANNOT be null)
    var addresses: RealmList<EmbeddedAddress> = realmListOf()
    // Dictionary of EmbeddedRealmObject type (value MUST be nullable)
    var addressByYear: RealmDictionary<EmbeddedAddress?> = realmDictionaryOf()
}
