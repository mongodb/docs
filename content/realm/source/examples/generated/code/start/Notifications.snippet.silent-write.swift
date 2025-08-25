let realm = try! Realm()

// Observe realm notifications
let token = realm.observe { notification, realm in
    // ... handle update
}

// Later, pass the token in an array to the realm.write(withoutNotifying:)
// method to write without sending a notification to that observer.
try! realm.write(withoutNotifying: [token]) {
    // ... write to realm
}

// Finally
token.invalidate()
