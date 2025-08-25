class Company : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var location: CustomGeoPoint? = null
}
