let realm = try! Realm()

let dogToys = realm.objects(DogToy.self)

// Get specific user by ObjectId id
let specificToy = dogToys.where {
    $0.id == ObjectId("11223344556677889900aabb")
}
