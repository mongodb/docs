// Logging in using anonymous authentication creates a user object
app.login(credentials: Credentials.anonymous) { [self] (result) in
    switch result {
    case .failure(let error):
        fatalError("Login failed: \(error.localizedDescription)")
    case .success(let user):
        // Assign the user object to a variable to demonstrate user deletion
        syncUser = user
    }
}

// Later, after the user is loggedd in we have a user,
// and the total users in the app = 1
XCTAssertNotNil(syncUser)
XCTAssertEqual(app.allUsers.count, 1)

// Call the `delete` method to delete the user
syncUser!.delete { (error) in
    XCTAssertNil(error)
}

// When you delete the user, the SyncSession is destroyed and
// there is no current user.
XCTAssertNil(app.currentUser)
// Now that we've deleted the user, the app has no users.
XCTAssertEqual(app.allUsers.count, 0)
