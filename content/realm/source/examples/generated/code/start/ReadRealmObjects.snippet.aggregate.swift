let realm = try! Realm()

let people = realm.objects(Person.self)

// People whose dogs' average age is 5
people.filter("dogs.@avg.age == 5")

// People with older dogs
people.filter("dogs.@min.age > 5")

// People with younger dogs
people.filter("dogs.@max.age < 2")

// People with many dogs
people.filter("dogs.@count > 2")

// People whose dogs' ages combined > 10 years
people.filter("dogs.@sum.age > 10")
