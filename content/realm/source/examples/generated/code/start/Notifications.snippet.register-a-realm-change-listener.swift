let realm = try! Realm()

// Observe realm notifications. Keep a strong reference to the notification token
// or the observation will stop.
let token = realm.observe { notification, realm in
    // `notification` is an enum specifying what kind of notification was emitted
    viewController.updateUI()
}

// ...

// Later, explicitly stop observing.
token.invalidate()
