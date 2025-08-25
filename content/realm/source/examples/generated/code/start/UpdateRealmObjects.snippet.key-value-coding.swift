let realm = try! Realm()

let allDogs = realm.objects(Dog.self)

try! realm.write {
    allDogs.first?.setValue("Sparky", forKey: "name")
    // Move the dogs to Toronto for vacation
    allDogs.setValue("Toronto", forKey: "currentCity")
}
