// Application Code
func updateUserFromServer() {
    let url = URL(string: "http://myapi.example.com/user")
    URLSession.shared.dataTask(with: url!) { data, _, _ in
        let realm = try! Realm()
        createOrUpdateUser(in: realm, with: data!)
    }
}

public func createOrUpdateUser(in realm: Realm, with data: Data) {
    let object = try! JSONSerialization.jsonObject(with: data) as? [String: String]
    try! realm.write {
        realm.create(User.self, value: object, update: .modified)
    }
}

// Test Code

let realmPath = URL(fileURLWithPath: "...")

func testThatUserIsUpdatedFromServer() {
    let config = Realm.Configuration(fileURL: realmPath)
    let testRealm = try! Realm(configuration: config)
    let jsonData = "{\"email\": \"help@realm.io\"}".data(using: .utf8)!
    // In our test, we're passing in the testRealm. This is where we'd
    // pass in our "real" realm in the application code above.
    createOrUpdateUser(in: testRealm, with: jsonData)
    XCTAssertEqual(testRealm.objects(User.self).first!.email, "help@realm.io",
                   "User was not properly updated from server.")
}
