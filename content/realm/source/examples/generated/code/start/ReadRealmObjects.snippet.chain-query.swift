let realm = try! Realm()
let tanDogs = realm.objects(Dog.self).filter("color = 'tan'")
let tanDogsWithBNames = tanDogs.filter("name BEGINSWITH 'B'")
