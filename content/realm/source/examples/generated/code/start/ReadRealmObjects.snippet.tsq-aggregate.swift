let realm = try! Realm()

let people = realm.objects(Person.self)

// People whose dogs' average age is 5
people.where {
    $0.dogs.age.avg == 5
}

// People with older dogs
people.where {
    $0.dogs.age.min > 5
}

// People with younger dogs
people.where {
    $0.dogs.age.max < 2
}

// People with many dogs
people.where {
    $0.dogs.count > 2
}

// People whose dogs' ages combined > 10 years
people.where {
    $0.dogs.age.sum > 10
}
