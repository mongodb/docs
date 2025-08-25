let realm = try! Realm()

// Observe and obtain token
let token = realm.observe { notification, realm in /* ... */ }

// Stop observing
token.invalidate()
