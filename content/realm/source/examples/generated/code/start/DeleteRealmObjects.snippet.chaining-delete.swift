let person = realm.object(ofType: Person.self, forPrimaryKey: 1)!
try! realm.write {
    // Delete the related collection
    realm.delete(person.dogs)
    realm.delete(person)
}
