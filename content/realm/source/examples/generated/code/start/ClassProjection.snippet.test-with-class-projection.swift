func testWithProjection() {
    let realm = try! Realm()
    // Create a Realm object, populate it with values
    let jasonBourne = Person(value: ["firstName": "Jason",
                                                       "lastName": "Bourne",
                                                       "address": [
                                                        "city": "Zurich",
                                                        "country": "Switzerland"]])
    try! realm.write {
        realm.add(jasonBourne)
    }

    // Retrieve all class projections of the given type `PersonProjection`
    // and filter for the first class projection where the `firstName` property
    // value is "Jason"
    let person = realm.objects(PersonProjection.self).first(where: { $0.firstName == "Jason" })!
    // Verify that we have the correct PersonProjection
    XCTAssert(person.firstName == "Jason")
    // See that `homeCity` exists as a projection property
    // Although it is not on the object model
    XCTAssert(person.homeCity == "Zurich")

    // Change a value on the class projection
    try! realm.write {
        person.firstName = "David"
    }

    // Verify that the projected property's value has changed
    XCTAssert(person.firstName == "David")
}
