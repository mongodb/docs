let realm = try! Realm()

let dogToys = realm.objects(DogToy.self)

// Get specific toy by ObjectId id
let specificToy = dogToys.filter("id = %@", ObjectId("11223344556677889900aabb")).first

// WRONG: Realm will not convert the string to an object id
// users.filter("id = '11223344556677889900aabb'") // not ok
// users.filter("id = %@", "11223344556677889900aabb") // not ok
