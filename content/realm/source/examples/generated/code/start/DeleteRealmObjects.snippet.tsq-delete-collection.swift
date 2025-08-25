let realm = try! Realm()
try! realm.write {
    // Find dogs younger than 2 years old.
    let puppies = realm.objects(Dog.self).where {
        $0.age < 2
    }

    // Delete the objects in the collection from the realm.
    realm.delete(puppies)
}
