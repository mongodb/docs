let realm = try! Realm()
let projectedPerson = realm.objects(PersonProjection.self).first(where: { $0.firstName == "Jason" })!
let token = projectedPerson.observe(keyPaths: ["firstName"], { change in
    switch change {
    case .change(let object, let properties):
        for property in properties {
            print("Property '\(property.name)' of object \(object) changed to '\(property.newValue!)'")
        }
    case .error(let error):
        print("An error occurred: \(error)")
    case .deleted:
        print("The object was deleted.")
    }
})

// Now update to trigger the notification
try! realm.write {
    projectedPerson.firstName = "David"
}
