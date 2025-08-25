class Geospatial_Company: Object {
    @Persisted var _id: ObjectId
    @Persisted var location: CustomGeoPoint?
    
    convenience init(_ location: CustomGeoPoint?) {
        self.init()
        self.location = location
    }
}
