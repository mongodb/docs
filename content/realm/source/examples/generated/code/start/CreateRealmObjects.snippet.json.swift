// Specify a dog toy in JSON
let data = "{\"name\": \"Tennis ball\"}".data(using: .utf8)!
let realm = try! Realm()
// Insert from data containing JSON
try! realm.write {
    let json = try! JSONSerialization.jsonObject(with: data, options: [])
    realm.create(DogToy.self, value: json)
}
