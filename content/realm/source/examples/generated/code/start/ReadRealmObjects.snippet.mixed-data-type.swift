let realm = try! Realm()

let dogs = realm.objects(Dog.self)

for dog in dogs {
    // Verify the type of the ``AnyRealmProperty`` when attempting to get it. This
    // returns an object whose property contains the matched type.

    // If you only care about one type, check for that type.
    if case let .string(companion) = dog.companion {
        print("\(dog.name)'s companion is: \(companion)")
        // Prints "Wolfie's companion is: Fluffy the Cat"
    }

    // Or if you want to do something with multiple types of data
    // that could be in the value, switch on the type.
    switch dog.companion {
    case .string:
        print("\(dog.name)'s companion is: \(dog.companion)")
        // Prints "Wolfie's companion is: string("Fluffy the Cat")
    case .object:
        print("\(dog.name)'s companion is: \(dog.companion)")
        // Prints "Fido's companion is: object(Dog { name = Spot })"
    case .none:
        print("\(dog.name) has no companion")
        // Prints "Rex has no companion" and "Spot has no companion"
    default:
        print("\(dog.name)'s companion is another type.")
    }
}
