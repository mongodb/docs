let realm = try! Realm()
let tanDogs = realm.objects(Dog.self).where {
    $0.color == "tan"
}
let tanDogsWithBNames = tanDogs.where {
    $0.name.starts(with: "B")
}
